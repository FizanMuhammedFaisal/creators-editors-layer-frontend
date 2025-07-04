'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import {
  Youtube,
  ArrowRight,
  Shield,
  CheckCircle,
  Building2
} from 'lucide-react'
import api from '@/lib/api'
import { useMutation } from '@tanstack/react-query'

// Simplified component for existing users
function QuickChannelConnect({ onComplete }) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connectMutation = useMutation({
    mutationFn: async () => {
      const response = await api.get('/api/oauth/auth/youtube')
      return response.data
    },
    onSuccess: data => {
      console.log('Connected successfully:', data)
      onComplete()
    },
    onError: error => {
      console.error('Connection failed:', error)
      setIsConnecting(false)
    }
  })

  const handleConnect = () => {
    window.location.href = 'http://localhost:3001/api/oauth/auth/youtube'
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white rounded-2xl p-8 border border-gray-100 shadow-lg text-center max-w-xl w-full'
      >
        <div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6'>
          <Building2 className='w-8 h-8 text-red-500' />
        </div>

        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Add New Workspace
        </h2>

        <p className='text-gray-600 mb-8 leading-relaxed'>
          Connect another YouTube channel to create a new workspace. Each
          workspace represents one YouTube channel where you can manage content
          and collaborate with your team.
        </p>

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8'>
          <div className='flex items-start gap-3'>
            <Shield className='w-5 h-5 text-blue-500 mt-0.5' />
            <div className='text-left'>
              <h3 className='font-semibold text-blue-900 mb-1'>
                Safe & Secure Connection
              </h3>
              <p className='text-sm text-blue-700'>
                We use YouTube's official OAuth system. We can only publish
                videos you approve - we cannot access your personal data or make
                unauthorized changes.
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-3 mb-8 text-left'>
          <div className='flex items-center gap-3 text-gray-600'>
            <CheckCircle className='w-5 h-5 text-green-500' />
            <span>Create and manage video uploads</span>
          </div>
          <div className='flex items-center gap-3 text-gray-600'>
            <CheckCircle className='w-5 h-5 text-green-500' />
            <span>Invite team members to collaborate</span>
          </div>
          <div className='flex items-center gap-3 text-gray-600'>
            <CheckCircle className='w-5 h-5 text-green-500' />
            <span>Review and approve content before publishing</span>
          </div>
          <div className='flex items-center gap-3 text-gray-600'>
            <CheckCircle className='w-5 h-5 text-green-500' />
            <span>Automated publishing to your channel</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConnect}
          disabled={isConnecting}
          className='inline-flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 w-full justify-center'
        >
          {isConnecting ? (
            <>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
              Connecting...
            </>
          ) : (
            <>
              <Youtube className='w-5 h-5' />
              Connect YouTube Channel
              <ArrowRight className='w-5 h-5' />
            </>
          )}
        </motion.button>

        <p className='text-sm text-gray-500 mt-4'>
          You'll be redirected to YouTube to authorize the connection
        </p>
      </motion.div>
    </div>
  )
}

export default QuickChannelConnect
