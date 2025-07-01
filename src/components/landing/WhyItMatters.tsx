import React from 'react'
import { Shield, Lock, Users, Clock } from 'lucide-react'

const WhyItMatters = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Avoid Risky Permissions',
      description:
        'Never share your YouTube login or channel access with editors again.'
    },
    {
      icon: Lock,
      title: 'Keep Your Brand Secure',
      description:
        'Maintain complete control over what gets published to your channel.'
    },
    {
      icon: Users,
      title: 'Let Editors Work Freely',
      description:
        'Editors can upload and iterate without needing your credentials.'
    },
    {
      icon: Clock,
      title: 'Centralize Approvals & History',
      description:
        'Track all uploads, approvals, and publishing history in one place.'
    }
  ]

  return (
    <section className='py-24 px-6'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            You Shouldn't Have to Share Your Channel Password.
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Traditional collaboration puts your entire channel at risk.
            CreatorFlow gives you a better way.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {benefits.map((benefit, index) => (
            <div key={index} className='text-center group'>
              <div className='w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-100 transition-colors'>
                <benefit.icon className='h-8 w-8 text-youtube-red' />
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                {benefit.title}
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Security Badge */}
        <div className='mt-16 text-center'>
          <div className='inline-flex items-center bg-green-50 border border-green-200 px-6 py-3 rounded-full'>
            <Shield className='h-5 w-5 text-green-600 mr-2' />
            <span className='text-green-800 font-medium'>
              Enterprise-grade security trusted by 10,000+ creators
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyItMatters
