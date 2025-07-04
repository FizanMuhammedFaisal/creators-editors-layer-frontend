'use client'
import { WorkspaceOnboarding } from '@/components/dashboard/workspace-onboarding'
import { useWorkspaceOnboarding } from '@/hooks/useWorkspaceOnboarding'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Shield, CheckCircle } from 'lucide-react'
import QuickChannelConnect from '@/components/dashboard/workspace-exixting-onboarding'
import WorkspaceCreate from '@/components/dashboard/workspace-create'

function Page() {
  const { needsOnboarding, isLoading, completeOnboarding } =
    useWorkspaceOnboarding()

  console.log('needsOnboarding:', needsOnboarding)

  const [showOnBoarding, setShowOnBoarding] = useState(needsOnboarding)
  const [authStatus, setAuthStatus] = useState(null)

  useEffect(() => {
    if (needsOnboarding) {
      setShowOnBoarding(true)
    }
  }, [needsOnboarding])

  // Check for auth status in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams)
    const authParam = urlParams.get('auth')
    console.log(authParam)
    if (authParam === 'success') {
      setAuthStatus('success')

      // window.history.replaceState({}, '', window.location.pathname)
    } else if (authParam === 'error') {
      setAuthStatus('error')

      // window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

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

  // Show success message
  if (authStatus === 'success') {
    return <WorkspaceCreate />
  }

  // Show error message
  if (authStatus === 'error') {
    return (
      <div className='fixed inset-0 z-50 bg-white flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-8'>
          <div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6'>
            <Shield className='w-8 h-8 text-red-500' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Connection Failed
          </h2>
          <p className='text-gray-600 mb-8'>
            There was an issue connecting your YouTube channel. Please try
            again.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAuthStatus(null)}
            className='inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200'
          >
            Try Again
            <ArrowRight className='w-5 h-5' />
          </motion.button>
        </div>
      </div>
    )
  }

  // First-time user - show full onboarding
  if (needsOnboarding) {
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
