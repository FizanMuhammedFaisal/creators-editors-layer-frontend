import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <HeroSection />
      <HowItWorks />
      {/* <WhyItMatters />
      <ProductPreview />
      <SocialProof />
      <CTASection />
      <Footer /> */}
    </div>
  )
}

export default page
