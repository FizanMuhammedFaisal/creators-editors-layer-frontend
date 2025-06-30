import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className='pt-32 pb-40 px-6 relative'>
      <div className='container mx-auto text-center max-w-4xl'>
        <h1 className='text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight'>
          Hire Editors Without{' '}
          <span className='text-gradient'>Giving Away Channel Access</span>
        </h1>

        <p className='text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed'>
          Let editors upload, you approve, we publish to YouTube — no access
          shared. The secure collaboration tool that top creators trust.
        </p>
        {/* the gradiant */}
        <div className='absolute left-1/2 transform -translate-x-1/2 -top-16 w-full max-w-4xl h-80 bg-gradient-to-b from-red-50/30 via-orange-50/20 to-transparent pointer-events-none' />
        <div className='absolute left-1/2 transform -translate-x-1/2 -top-14 w-full max-w-3xl h-64 bg-gradient-to-r from-transparent via-red-100/40 to-transparent pointer-events-none blur-xl' />

        <div className='flex flex-col sm:flex-row gap-6 justify-center mb-20'>
          <Button
            size='lg'
            className='bg-primary-red hover:bg-red-600 text-white px-10 py-5 text-lg hover-lift'
          >
            Get Started Free
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='px-10 py-5 text-lg border-2 hover:bg-gray-50 hover-lift'
          >
            Request Beta Access
          </Button>
        </div>

        {/* 3-Step Workflow Visual */}
        <div className='relative'>
          <div className='grid md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
            {/* Step 1 */}
            <div className='bg-white rounded-2xl p-8 shadow-sm border font-display border-gray-100 hover-lift'>
              <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto'>
                <span className='text-blue-600 font-bold text-lg'>1</span>
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>
                Editor Uploads
              </h3>
              <p className='text-gray-600 text-sm'>
                Your editor uploads the finished video to our secure platform
              </p>
            </div>

            {/* Arrow */}
            <div className='hidden md:flex items-center justify-center'>
              <ArrowRight className='h-6 w-6 text-gray-300' />
            </div>

            {/* Step 2 */}
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover-lift'>
              <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto'>
                <span className='text-green-600 font-bold text-lg'>2</span>
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>You Approve</h3>
              <p className='text-gray-600 text-sm'>
                Review, add feedback, and approve when ready to publish
              </p>
            </div>

            {/* Arrow */}
            <div className='hidden md:flex items-center justify-center'>
              <ArrowRight className='h-6 w-6 text-gray-300' />
            </div>

            {/* Step 3 */}
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover-lift'>
              <div className='w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto'>
                <span className='text-primary-red font-bold text-lg'>3</span>
              </div>
              <h3 className='font-semibold text-gray-900 mb-2'>We Publish</h3>
              <p className='text-gray-600 text-sm'>
                Automatic upload to your YouTube channel - securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
