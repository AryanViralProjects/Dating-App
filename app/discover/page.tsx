'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { BottomNav } from '@/components/bottom-nav'

// Mock data for demonstration
const mockProfiles = [
  {
    id: 1,
    name: 'Alex',
    age: 24,
    program: 'MBA',
    distance: '0.5 km',
    bio: 'Coffee enthusiast. Love reading and hiking.',
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 2,
    name: 'Sam',
    age: 26,
    program: 'PGP',
    distance: '1.2 km',
    bio: 'Foodie. Always up for an adventure!',
    image: '/placeholder.svg?height=400&width=300',
  },
  // Add more mock profiles as needed
]

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<string | null>(null)

  const currentProfile = mockProfiles[currentIndex]

  const swipe = (dir: string) => {
    setDirection(dir)
    setTimeout(() => {
      setDirection(null)
      setCurrentIndex((prev) => (prev + 1) % mockProfiles.length)
    }, 300)
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <div className="container max-w-md mx-auto pt-4 px-4">
        <h1 className="text-2xl font-bold text-isb-blue mb-4">Discover</h1>

        <div className="relative h-[600px] w-full">
          <AnimatePresence>
            {currentProfile && (
              <motion.div
                key={currentProfile.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: direction === 'right' ? 300 : direction === 'left' ? -300 : 0,
                  rotate: direction === 'right' ? 20 : direction === 'left' ? -20 : 0,
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full h-full"
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={currentProfile.image}
                    alt={currentProfile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h2 className="text-2xl font-bold">
                      {currentProfile.name}, {currentProfile.age}
                    </h2>
                    <p className="text-sm opacity-90">{currentProfile.program}</p>
                    <p className="text-sm opacity-90">{currentProfile.distance} away</p>
                    <p className="mt-2">{currentProfile.bio}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => swipe('left')}
            size="icon"
            className="h-14 w-14 rounded-full bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => swipe('super')}
            size="icon"
            className="h-14 w-14 rounded-full bg-white border-2 border-isb-gold text-isb-gold hover:bg-isb-gold hover:text-white"
          >
            <Star className="h-6 w-6" />
          </Button>
          <Button
            onClick={() => swipe('right')}
            size="icon"
            className="h-14 w-14 rounded-full bg-white border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}

