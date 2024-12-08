'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log('Login attempted with:', email, password)
    router.push('/discover')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-isb-blue to-white">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="mt-6 text-4xl font-bold text-isb-blue">Campus Date</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-700">Connect and engage with your fellow ISBians!</h2>
          <p className="mt-4 text-sm text-gray-600">Sign in with your college email</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="email-address">College Email</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full bg-isb-blue hover:bg-isb-blue/90 text-white">
              Sign in
            </Button>
          </div>
        </form>
        <div className="text-center">
          <a href="#" className="font-medium text-isb-blue hover:text-isb-blue/90">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  )
}

