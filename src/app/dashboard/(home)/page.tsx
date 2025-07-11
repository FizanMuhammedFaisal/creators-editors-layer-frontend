'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, ArrowRight, Clock, Users, Video } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/workspaceService'
import api from '@/lib/api'

import WorkspaceEmpy from '@/components/dashboard/workspace-empy'

export default function Page() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Query to fetch workspaces
  const {
    data: workspaces = [],
    isLoading: workspacesLoading,
    error: workspacesError
  } = useQuery({
    queryKey: ['workspaces'],
    queryFn: WorkspaceService.getWorkspaces,
    enabled: !!user,
    staleTime: 5 * 60 * 1000
  })

  // Query to fetch recent submissions across all workspaces
  const { data: recentSubmissions = [], isLoading: submissionsLoading } =
    useQuery({
      queryKey: ['recent-submissions'],
      queryFn: async () => {
        if (!workspaces.length) return []

        // Get submissions from all workspaces
        const submissionPromises = workspaces.map(workspace =>
          api
            .get(`/api/workspaces/${workspace.id}/submissions`)
            .then(res => res.data.data || [])
            .catch(() => [])
        )

        const allSubmissions = await Promise.all(submissionPromises)
        const flatSubmissions = allSubmissions.flat()

        // Sort by submission date and take the most recent 5
        return flatSubmissions
          .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
          .slice(0, 5)
      },
      enabled: !!user && workspaces.length > 0
    })

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const hasWorkspaces = workspaces.length > 0

  // Calculate some basic stats
  const totalSubmissions = recentSubmissions.length
  const pendingSubmissions = recentSubmissions.filter(
    s => s.status === 'pending'
  ).length
  const approvedSubmissions = recentSubmissions.filter(
    s => s.status === 'approved'
  ).length

  if (workspacesLoading) {
    return (
      <div className='flex flex-1 flex-col gap-6 p-6 pt-0'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='bg-white rounded-xl p-8 border border-gray-100 shadow-sm'
        >
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red'></div>
            <span className='ml-3 text-gray-600'>Loading...</span>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!hasWorkspaces) {
    return (
      <div className='flex flex-1 flex-col gap-6 p-6 pt-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-white rounded-xl p-8 border border-gray-100 shadow-sm'
        >
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-semibold text-gray-900 mb-2'>
                {getGreeting()},{' '}
                {user?.user_metadata.name.split(' ')[0] || 'User'}
              </h1>
              <p className='text-gray-600'>
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </motion.div>
        <WorkspaceEmpy />
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-6 p-6 pt-0'>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white rounded-xl p-8 border border-gray-100 shadow-sm'
      >
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-semibold text-gray-900 mb-2'>
              {getGreeting()},{' '}
              {user?.user_metadata.name.split(' ')[0] || 'User'}
            </h1>
            <p className='text-gray-600'>
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          {hasWorkspaces && (
            <div className='flex items-center gap-3'>
              <span className='text-sm text-gray-600'>
                {workspaces.length} workspace
                {workspaces.length !== 1 ? 's' : ''}
              </span>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Stats - Only show if we have meaningful data */}
      {!submissionsLoading && totalSubmissions > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-4'
        >
          <div className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-50 rounded-lg'>
                <Video className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <p className='text-2xl font-semibold text-gray-900'>
                  {totalSubmissions}
                </p>
                <p className='text-sm text-gray-600'>Recent Submissions</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-yellow-50 rounded-lg'>
                <Clock className='w-5 h-5 text-yellow-600' />
              </div>
              <div>
                <p className='text-2xl font-semibold text-gray-900'>
                  {pendingSubmissions}
                </p>
                <p className='text-sm text-gray-600'>Pending Review</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-50 rounded-lg'>
                <Users className='w-5 h-5 text-green-600' />
              </div>
              <div>
                <p className='text-2xl font-semibold text-gray-900'>
                  {approvedSubmissions}
                </p>
                <p className='text-sm text-gray-600'>Approved</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Your Workspaces */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm'
      >
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Your Workspaces
          </h2>
          <button
            onClick={() => router.push('/dashboard/workspaces')}
            className='flex items-center gap-2 text-sm text-primary-red hover:text-primary-red-hover transition-colors'
          >
            View All
            <ArrowRight className='w-4 h-4' />
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {workspaces.slice(0, 6).map((workspace, index) => (
            <motion.div
              key={workspace.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className='p-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm transition-all duration-200 cursor-pointer'
              onClick={() =>
                router.push(`/dashboard/workspaces/${workspace.id}`)
              }
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <span className='text-sm font-medium text-gray-700'>
                    {workspace.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className='flex-1'>
                  <h3 className='font-medium text-gray-900 truncate'>
                    {workspace.name}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {new Date(workspace.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity - Only show if we have submissions */}
      {!submissionsLoading && recentSubmissions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='bg-white rounded-xl p-6 border border-gray-100 shadow-sm'
        >
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Recent Activity
            </h2>
            <button className='flex items-center gap-2 text-sm text-primary-red hover:text-primary-red-hover transition-colors'>
              View All
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>

          <div className='space-y-4'>
            {recentSubmissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className='flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors'
              >
                <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <Video className='w-5 h-5 text-gray-600' />
                </div>
                <div className='flex-1'>
                  <h4 className='font-medium text-gray-900 truncate'>
                    {submission.title}
                  </h4>
                  <p className='text-sm text-gray-600'>
                    {new Date(submission.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      submission.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : submission.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {workspacesError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-red-50 border border-red-200 rounded-xl p-6'
        >
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
              <Clock className='w-4 h-4 text-red-600' />
            </div>
            <div>
              <h3 className='font-medium text-red-800'>
                Failed to load workspaces
              </h3>
              <p className='text-sm text-red-600'>
                Please check your connection and try again.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
