import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8  rounded-full flex items-center justify-center'>
              <Image
                alt='logo'
                className='rounded-full'
                height={55}
                width={55}
                src={'/logo.png'}
              />
            </div>
            <span className='text-xl font-semibold text-gray-900'>
              Upload Thing
            </span>
          </div>

          <div className='flex items-center space-x-6'>
            <Button
              variant='ghost'
              className='text-gray-600 hover:text-gray-900'
            >
              Sign In
            </Button>
            <Button className='bg-primary-red hover:bg-primary-red-hover text-white'>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
