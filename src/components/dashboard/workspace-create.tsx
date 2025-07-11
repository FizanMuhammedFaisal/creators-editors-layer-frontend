'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  CheckCircle,
  GalleryVerticalEnd,
  Loader2
} from 'lucide-react'
import api from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function WorkspaceCreationForm() {
  const [workspaceName, setWorkspaceName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const { data: youtubeData, isLoading: isLoadingYoutube } = useQuery({
    queryKey: ['youtube-me'],
    queryFn: async () => {
      const response = await api.get('/api/auth/me')
      return response.data
    }
  })
  interface WorkspaceData {
    name: string
    youtubeId?: string
    youtubeName?: string
  }
  // Auto-populate workspace name when user data is loaded
  useEffect(() => {
    console.log(youtubeData)
    if (youtubeData?.channel[0].channel_name && !workspaceName) {
      setWorkspaceName(youtubeData.channel[0].channel_name)
    }
  }, [youtubeData?.channel, workspaceName])

  // Create workspace mutation
  const createWorkspaceMutation = useMutation({
    mutationFn: async (workspaceData: WorkspaceData) => {
      const response = await api.post('/api/workspaces', workspaceData)
      return response.data
    },
    onSuccess: data => {
      console.log('Workspace created successfully:', data)
      // Redirect to dashboard or show success message
      window.location.href = '/dashboard'
    },
    onError: error => {
      console.error('Failed to create workspace:', error)
      setIsCreating(false)
    }
  })

  const handleCreateWorkspace = async e => {
    e.preventDefault()
    if (!workspaceName.trim()) return

    setIsCreating(true)
    await createWorkspaceMutation.mutateAsync({
      name: workspaceName.trim(),
      youtubeId: youtubeData?.youtubeId,
      youtubeName: youtubeData?.name
    })
  }

  if (isLoadingYoutube) {
    return (
      <div className='fixed inset-0 z-50 bg-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
          <p className='text-gray-600'>Loading your information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='fixed inset-0 z-50 bg-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='flex flex-col gap-6'>
          <form onSubmit={handleCreateWorkspace}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center gap-2'>
                <a
                  href='#'
                  className='flex flex-col items-center gap-2 font-medium'
                >
                  <div className='flex size-8 items-center justify-center rounded-md'>
                    <GalleryVerticalEnd className='size-6 text-primary-red' />
                  </div>
                  <span className='sr-only'>YuFlow</span>
                </a>
                <h1 className='text-xl font-bold'>Create Your Workspace</h1>
                <div className='text-center text-sm text-gray-600'>
                  Connected to:{' '}
                  <span className='font-medium'>
                    {youtubeData?.name || 'YouTube Channel'}
                  </span>
                </div>
              </div>

              <div className='flex flex-col gap-6'>
                <div className='grid gap-3'>
                  <Label htmlFor='workspaceName'>
                    What would you like to name your workspace?
                  </Label>
                  <Input
                    id='workspaceName'
                    type='text'
                    placeholder='e.g., My Gaming Channel, Tech Reviews, etc.'
                    required
                    value={workspaceName}
                    onChange={e => setWorkspaceName(e.target.value)}
                    className='w-full'
                  />
                  <p className='text-sm text-gray-500'>
                    Choose a name that helps you identify this workspace easily
                  </p>
                </div>

                <Button
                  type='submit'
                  className='w-full bg-primary-red hover:bg-primary-red-hover'
                  disabled={isCreating || !workspaceName.trim()}
                >
                  Create Workspace
                  {isCreating && (
                    <Loader2 className='animate-spin ml-2 h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default WorkspaceCreationForm
