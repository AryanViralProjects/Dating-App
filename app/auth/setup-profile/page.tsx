'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SetupProfilePage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [program, setProgram] = useState('')
  const [gender, setGender] = useState('')
  const [interestedIn, setInterestedIn] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the profile setup logic
    console.log('Profile setup:', { 
      name, 
      age, 
      program, 
      gender,
      interestedIn,
      photo 
    })
    router.push('/discover')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-isb-blue to-white">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-isb-blue">Set Up Your Profile</h2>
          <p className="mt-2 text-sm text-gray-600">Let's get to know you better</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Existing fields */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Gender Selection */}
            <div>
              <Label>Your Gender</Label>
              <Select required value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interest Selection */}
            <div>
              <Label>Interested In</Label>
              <Select required value={interestedIn} onValueChange={setInterestedIn}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select gender preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="program">Program at ISB</Label>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ivi">iVi</SelectItem>
                  <SelectItem value="pgp">PGP</SelectItem>
                  <SelectItem value="mfab">MFAB</SelectItem>
                  <SelectItem value="pgpmax">PGPMax</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="photo">Profile Photo</Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                required
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full bg-isb-blue hover:bg-isb-blue/90 text-white">
              Complete Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}