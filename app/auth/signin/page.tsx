'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!res.ok) throw new Error(await res.text())
      
      setIsOtpSent(true)
      toast.success('Verification code sent to your email')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      if (!res.ok) throw new Error(await res.text())
      
      router.push('/profile')
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sign In with ISB Email</h1>
        
        {!isOtpSent ? (
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="your.name@isb.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              onClick={sendOtp}
              disabled={loading || !email.endsWith('@isb.edu')}
              className="w-full"
            >
              Send Verification Code
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter verification code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button 
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6}
              className="w-full"
            >
              Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 