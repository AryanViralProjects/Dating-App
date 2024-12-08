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

    const profile = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    return NextResponse.json(profile)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, age, gender, interestedIn, program, photoUrl } = body

    const updatedProfile = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, age, gender, interestedIn, program, photoUrl }
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}