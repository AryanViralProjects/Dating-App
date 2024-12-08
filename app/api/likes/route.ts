import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 })
    }

    const { likedUserId } = await req.json()

    // Create the like
    const like = await prisma.like.create({
      data: {
        userId: currentUser.id,
        likedId: likedUserId,
      }
    })

    // Check for mutual like (match)
    const mutualLike = await prisma.like.findFirst({
      where: {
        userId: likedUserId,
        likedId: currentUser.id
      }
    })

    if (mutualLike) {
      // Create a match if there's a mutual like
      await prisma.match.create({
        data: {
          user1Id: currentUser.id,
          user2Id: likedUserId
        }
      })
    }

    return NextResponse.json({ 
      like,
      isMatch: !!mutualLike 
    })
  } catch (error) {
    console.error('[LIKE_ERROR]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// Get likes received
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 })
    }

    const likes = await prisma.like.findMany({
      where: {
        likedId: currentUser.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            photoUrl: true,
            program: true
          }
        }
      }
    })

    return NextResponse.json(likes)
  } catch (error) {
    console.error('[GET_LIKES_ERROR]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}