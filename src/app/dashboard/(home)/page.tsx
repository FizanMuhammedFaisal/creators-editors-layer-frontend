'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Activity, ArrowRight } from 'lucide-react'

export default function Page() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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
              {getGreeting()}, Alex
            </h1>
            <p className='text-gray-600'>
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-mono text-gray-900'>
              {currentTime.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className='text-sm text-gray-500'>Local time</div>
          </div>
        </div>
      </motion.div>

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

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='flex items-center gap-2 bg-primary-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-red-hover transition-colors duration-200'
          >
            View All
            <ArrowRight className='w-4 h-4' />
          </motion.button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='p-6 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors duration-200'
          >
            <h3 className='font-medium text-gray-900 mb-2'>Recent Activity</h3>
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
    </div>
  )
}
