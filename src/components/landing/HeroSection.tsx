'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import HeroSectionCard from './HeroSectionCard'

const HeroSection = () => {
  const MotionButton = motion(Button)
  return (
    <section className='pt-48 pb-48 px-6 relative'>
      <div className='mx-auto text-center '>
        <div className=' max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight'>
            Let Editors Work{' '}
            <span className='text-gradient'>Without Touching Your Channel</span>
          </h1>

          <p className='md:text-xl text-gray-800 mb-16 md:max-w-2xl max-w-2xl text-lg mx-auto tracking-wide'>
            Let editors upload, you approve, we publish to YouTube — no access
            shared. The secure collaboration tool that top creators trust.
          </p>
          {/* the gradiant */}
          <div className='absolute left-1/2 transform -translate-x-1/2 -top-36 w-full max-w-4xl h-80 bg-gradient-to-b from-red-50/40 via-primary-red-accent/30 to-transparent pointer-events-none' />
          <div className='absolute left-1/2 transform -translate-x-1/2 -top-14 w-full max-w-3xl h-64 bg-gradient-to-r from-transparent via-red-100/40 to-transparent pointer-events-none blur-xl' />

          <div className='flex  sm:flex-row sm:gap-6  gap-2.5 justify-center mb-20'>
            <MotionButton
              size='lg'
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
              className='bg-primary-red cursor-pointer hover:bg-primary-red-hover text-white px-5 py-6 sm:px-9 sm:py-6 font-bold text-lg hover-lift'
            >
              Get Started Free
            </MotionButton>
            <MotionButton
              size='lg'
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
              variant='outline'
              className='sm:px-9  sm:py-6 px-5 py-6 text-lg  cursor-pointer hover:bg-primary-red-hover/10 '
            >
              Request Beta Access
            </MotionButton>
          </div>
        </div>

        <motion.div
          className='pt-20'
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.2,
            ease: [0.25, 0.25, 0, 1]
          }}
        >
          <HeroSectionCard />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

//  <div className='relative'>
//       <div className='grid md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
//         {/* Step 1 */}
//         <div className='bg-white rounded-2xl p-8 shadow-sm border font-display border-gray-100 hover-lift'>
//           <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto'>
//             <span className='text-blue-600 font-bold text-lg'>1</span>
//           </div>
//           <h3 className='font-semibold text-gray-900 mb-2'>
//             Editor Uploads
//           </h3>
//           <p className='text-gray-600 text-sm'>
//             Your editor uploads the finished video to our secure platform
//           </p>
//         </div>

//         {/* Arrow */}
//         <div className='hidden md:flex items-center justify-center'>
//           <ArrowRight className='h-6 w-6 text-gray-300' />
//         </div>

//         {/* Step 2 */}
//         <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover-lift'>
//           <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto'>
//             <span className='text-green-600 font-bold text-lg'>2</span>
//           </div>
//           <h3 className='font-semibold text-gray-900 mb-2'>You Approve</h3>
//           <p className='text-gray-600 text-sm'>
//             Review, add feedback, and approve when ready to publish
//           </p>
//         </div>

//         {/* Arrow */}
//         <div className='hidden md:flex items-center justify-center'>
//           <ArrowRight className='h-6 w-6 text-gray-300' />
//         </div>

//         {/* Step 3 */}
//         <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover-lift'>
//           <div className='w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto'>
//             <span className='text-primary-red font-bold text-lg'>3</span>
//           </div>
//           <h3 className='font-semibold text-gray-900 mb-2'>We Publish</h3>
//           <p className='text-gray-600 text-sm'>
//             Automatic upload to your YouTube channel - securely
//           </p>
//         </div>
//       </div>
//     </div>
