'use client'
import { Building2, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import React from 'react'

import { useRouter } from 'next/navigation'

function WorkspaceEmpy() {
  const router = useRouter()
  const hanldeCreateWorkSpace = () => {
    router.push('/dashboard/org-add')
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className='bg-white rounded-xl p-8 border border-gray-100 shadow-sm'
    >
      <div className='text-center py-12'>
        <div className='mx-auto max-w-md'>
          <div className='mx-auto flex items-center justify-center w-16 h-16 bg-primary-red-light rounded-full mb-6'>
            <Building2 className='w-8 h-8 text-primary-red' />
          </div>

          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            No workspace found
          </h3>
          <p className='text-gray-600 mb-8'>
            You haven't created an WorkSpace yet. Create one to get started with
            managing your Channel and Content.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              hanldeCreateWorkSpace()
            }}
            className='inline-flex items-center gap-2 bg-primary-red text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-red-hover transition-colors duration-200'
          >
            <Plus className='w-5 h-5' />
            Create Your First Workspace
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default WorkspaceEmpy
