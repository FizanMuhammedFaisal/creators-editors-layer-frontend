import React from 'react'
import { Button } from '@/components/ui/button'

import Link from 'next/link'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8  rounded-full flex items-center justify-center'>
              <span className='bg-primary-red h-6 w-6 rounded-full'></span>
            </div>
            <span className='text-xl font-semibold text-gray-900'>
              Upload Thing
            </span>
          </div>

          <div className='flex items-center space-x-6'>
            <Button
              variant='ghost'
              className='text-gray-600 font-bold cursor-pointer hover:text-gray-900'
            >
              <Link href={'/auth/login'}> Sign In</Link>
            </Button>
            <Button className='bg-primary-red hover:bg-primary-red-hover  cursor-pointer font-bold text-white'>
              <Link href={'/auth/signup'}> Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
