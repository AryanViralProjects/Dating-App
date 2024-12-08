import { BottomNav } from '@/components/bottom-nav'

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <div className="container max-w-md mx-auto pt-4 px-4">
        <h1 className="text-2xl font-bold text-isb-blue mb-4">Messages</h1>
        <p className="text-gray-600">You don't have any messages yet. Start a conversation with your matches!</p>
      </div>
      <BottomNav />
    </main>
  )
}

