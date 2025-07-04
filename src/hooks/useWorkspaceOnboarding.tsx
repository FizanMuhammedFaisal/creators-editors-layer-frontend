import api from '@/lib/api'
import { WorkspaceService } from '@/services/workspaceService'
import { useEffect, useState } from 'react'

export function useWorkspaceOnboarding() {
  const [needsOnboarding, setNeedsOnboarding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkUserWorkspaces()
  }, [])

  const checkUserWorkspaces = async () => {
    try {
      // Replace with your actual API call
      const response = await WorkspaceService.getWorkspaces()
      console.log(response)
      setNeedsOnboarding(response.length === 0)
    } catch (error) {
      console.error('Error checking workspaces:', error)
      setNeedsOnboarding(true) // Safe default
    } finally {
      setIsLoading(false)
    }
  }

  const completeOnboarding = () => {
    setNeedsOnboarding(false)
  }

  return { needsOnboarding, isLoading, completeOnboarding }
}
