import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser?.interestedIn) {
      return new NextResponse("Profile incomplete", { status: 400 })
    }

    const potentialMatches = await prisma.user.findMany({
      where: {
        AND: [
          { gender: currentUser.interestedIn },
          { interestedIn: currentUser.gender },
          { email: { not: session.user.email } },
          { isProfileComplete: true },
          {
            // Exclude users already liked
            NOT: {
              likedBy: {
                some: {
                  userId: currentUser.id
                }
              }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        age: true,
        gender: true,
        program: true,
        photoUrl: true,
        bio: true
      }
    })

    return NextResponse.json(potentialMatches)
  } catch (error) {
    console.error('[DISCOVER_ERROR]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}