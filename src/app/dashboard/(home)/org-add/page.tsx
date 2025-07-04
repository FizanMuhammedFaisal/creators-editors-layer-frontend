'use client'
import QuickChannelConnect from '@/components/dashboard/workspace-exixting-onboarding'
import { WorkspaceOnboarding } from '@/components/dashboard/workspace-onboarding'
import { useWorkspaceOnboarding } from '@/hooks/useWorkspaceOnboarding'
import { useEffect, useState } from 'react'

function Page() {
  const { needsOnboarding, isLoading, completeOnboarding } =
    useWorkspaceOnboarding()

  console.log('needsOnboarding:', needsOnboarding)

  const [showOnBoarding, setShowOnBoarding] = useState(needsOnboarding)

  useEffect(() => {
    if (needsOnboarding) {
      setShowOnBoarding(true)
    }
  }, [needsOnboarding])

  // Show loading state while checking onboarding status
  if (isLoading) {
    return (
      <div className='fixed inset-0 z-50 bg-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    )
  }

  // First-time user - show full onboarding
  if (showOnBoarding) {
    return (
      <div className='fixed inset-0 z-50 bg-white overflow-y-auto'>
        <WorkspaceOnboarding onComplete={completeOnboarding} />
      </div>
    )
  }

  // Existing user - show simplified channel connection
  return (
    <div className='fixed inset-0 z-50 bg-white overflow-y-auto'>
      <QuickChannelConnect
        onComplete={() => {
          // Handle completion - maybe redirect to dashboard or show success message
          console.log('Workspace added successfully!')
          // You might want to redirect or update the UI here
        }}
      />
    </div>
  )
}

export default Page
