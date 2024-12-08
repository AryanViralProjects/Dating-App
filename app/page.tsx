import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 p-8">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Welcome to Campus Date</h1>
          <p className="text-xl text-gray-300 drop-shadow-md">Connect with fellow ISB students</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            asChild 
            className="w-full h-12 text-lg font-semibold bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/auth/login">Login</Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            className="w-full h-12 text-lg font-semibold border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

