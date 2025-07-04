'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Activity, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

import { useQuery } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/workspaceService'

import WorkspaceEmpy from '@/components/dashboard/workspace-empy'

export default function Page() {
  const [currentTime, setCurrentTime] = useState(new Date())

  const { user } = useAuthStore()

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
    enabled: !!user, // Only run if user exists
    staleTime: 5 * 60 * 1000 // 5 minutes
  })

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const stats = [
    { icon: TrendingUp, value: '24.5K', label: 'Revenue' },
    { icon: Users, value: '1,429', label: 'Users' },
    { icon: Activity, value: '94.2%', label: 'Uptime' }
  ]

  // @ts-ignore
  const hasWorkspaces = workspaces.length > 0

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
        </div>
      </motion.div>

      {/* Check for workspaces and show appropriate content */}
      {workspacesLoading ? (
        // Loading state
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='bg-white rounded-xl p-8 border border-gray-100 shadow-sm'
        >
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red'></div>
            <span className='ml-3 text-gray-600'>Loading workspaces...</span>
          </div>
        </motion.div>
      ) : !hasWorkspaces ? (
        // No workspaces - show create workspace section
        <WorkspaceEmpy />
      ) : (
        // Has workspaces - show normal dashboard content
        <>
          {/* Stats Grid */}
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className='bg-white aspect-video rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300'
              >
                <div className='flex items-start justify-between mb-4'>
                  <div className='p-2 bg-gray-50 rounded-lg'>
                    <stat.icon className='w-5 h-5 text-gray-700' />
                  </div>
                </div>

                <div>
                  <div className='text-2xl font-semibold text-gray-900 mb-1'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-gray-600'>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='bg-white min-h-[60vh] flex-1 rounded-xl p-8 border border-gray-100 shadow-sm'
          >
            <div className='flex items-center justify-between mb-8'>
              <div>
                <h2 className='text-xl font-semibold text-gray-900 mb-1'>
                  Dashboard Overview
                </h2>
                <p className='text-gray-600 text-sm'>
                  Your key metrics and insights
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <select className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent'>
                  <option value=''>Select Workspace</option>
                  {workspaces?.map(workspace => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </option>
                  ))}
                </select>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='flex items-center gap-2 bg-primary-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-red-hover transition-colors duration-200'
                >
                  View All
                  <ArrowRight className='w-4 h-4' />
                </motion.button>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className='p-6 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors duration-200'
              >
                <h3 className='font-medium text-gray-900 mb-2'>
                  Recent Activity
                </h3>
                <p className='text-sm text-gray-600 mb-4'>
                  Latest updates and changes
                </p>
                <div className='space-y-3'>
                  {[1, 2, 3].map(i => (
                    <div key={i} className='flex items-center gap-3'>
                      <div className='w-2 h-2 bg-primary-red-light rounded-full'></div>
                      <span className='text-sm text-gray-700'>
                        Activity item {i}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className='p-6 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors duration-200'
              >
                <h3 className='font-medium text-gray-900 mb-2'>Quick Stats</h3>
                <p className='text-sm text-gray-600 mb-4'>
                  Key performance indicators
                </p>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-700'>Growth</span>
                    <span className='text-sm font-medium text-primary-red'>
                      +12.5%
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-700'>Conversion</span>
                    <span className='text-sm font-medium text-primary-red'>
                      8.2%
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-700'>Retention</span>
                    <span className='text-sm font-medium text-primary-red'>
                      94.1%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}

      {/* Error state */}
      {workspacesError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-red-50 border border-red-200 rounded-xl p-6'
        >
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'>
              <Activity className='w-4 h-4 text-red-600' />
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
