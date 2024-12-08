import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    
    console.log('Received email:', email) // Debug log

    // Check if email is ISB domain
    if (!email.endsWith('@isb.edu')) {
      return new NextResponse(
        "Please use your ISB email address",
        { status: 400 }
      )
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    console.log('Generated OTP:', otp) // Debug log
    
    try {
      // Store OTP in database with expiry
      await prisma.oTP.create({
        data: {
          identifier: email,
          token: otp,
          expires: new Date(Date.now() + 10 * 60 * 1000)
        }
      })
      console.log('OTP stored in database') // Debug log
    } catch (dbError) {
      console.error('Database Error:', dbError)
      return new NextResponse("Database Error", { status: 500 })
    }

    try {
      // Send email using Resend
      await resend.emails.send({
        from: 'ISB Dating App <onboarding@resend.dev>',
        to: email,
        subject: 'Your ISB Dating App Verification Code',
        html: `
          <h1>Welcome to ISB Dating App</h1>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        `
      })
      console.log('Email sent successfully') // Debug log
    } catch (emailError) {
      console.error('Email Error:', emailError)
      return new NextResponse("Email Service Error", { status: 500 })
    }

    return NextResponse.json({ message: "Verification code sent" })
  } catch (error) {
    console.error('[EMAIL_ERROR]', error)
    return new NextResponse(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An unknown error occurred' }), 
      { status: 500 }
    )
  }
}