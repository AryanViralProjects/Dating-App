import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    // Find valid token
    const verificationToken = await prisma.OTP.findFirst({
      where: {
        identifier: email,
        token: otp,
        expires: { gt: new Date() }
      }
    })

    if (!verificationToken) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or expired code" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Find or create user
    const user = await prisma.user.upsert({
      where: { email },
      update: { emailVerified: new Date() },
      create: {
        email,
        emailVerified: new Date()
      }
    })

    // Delete used token
    await prisma.OTP.delete({
      where: { id: verificationToken.id }
    })

    return NextResponse.json({ 
      userId: user.id,
      message: "Email verified successfully" 
    })

  } catch (error) {
    console.error('[VERIFY_ERROR]', error)
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", details: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
} 