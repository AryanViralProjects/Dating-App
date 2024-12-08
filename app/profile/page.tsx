'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { BottomNav } from '@/components/bottom-nav'
import { Settings, Shield } from 'lucide-react'

export default function ProfilePage() {
  const [name, setName] = useState('Alex Johnson')
  const [age, setAge] = useState('24')
  const [program, setProgram] = useState('MBA')
  const [bio, setBio] = useState('Coffee enthusiast. Love reading and hiking.')

  const profileCompletion = 80 // This would be calculated based on filled fields

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <div className="container max-w-md mx-auto pt-4 px-4">
        <h1 className="text-2xl font-bold text-isb-blue mb-4">Your Profile</h1>

        <div className="mb-6">
          <Label>Profile Completion</Label>
          <Progress value={profileCompletion} className="mt-2" />
          <p className="text-sm text-gray-600 mt-1">{profileCompletion}% complete</p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="program">Program</Label>
            <Input
              id="program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button className="w-full bg-isb-blue hover:bg-isb-blue/90">
            Save Changes
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          <Button variant="outline" className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" className="w-full">
            <Shield className="mr-2 h-4 w-4" />
            Safety Center
          </Button>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}

