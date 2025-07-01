import Header from '@/components/layout/Header'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorks from '@/components/landing/HowItWorks'
import WhyItMatters from '@/components/landing/WhyItMatters'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <HeroSection />
      <HowItWorks />
      <WhyItMatters />
      {/* <ProductPreview />
      <SocialProof />
      <CTASection />
      <Footer /> */}
    </div>
  )
}

export default page
