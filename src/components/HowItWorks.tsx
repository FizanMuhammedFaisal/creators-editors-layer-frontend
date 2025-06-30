import React from 'react'
import { Upload, CheckCircle, Youtube } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Editor Uploads Video',
      description:
        'Your editor uploads the finished video with metadata, thumbnails, and descriptions to your private dashboard.',
      features: [
        'Drag & drop interface',
        'Progress tracking',
        'File validation'
      ]
    },
    {
      icon: CheckCircle,
      title: 'You Review and Approve',
      description:
        'Get notified instantly. Review the content, leave feedback, request changes, or approve for publishing.',
      features: [
        'Real-time notifications',
        'Comment system',
        'Approval workflow'
      ]
    },
    {
      icon: Youtube,
      title: 'We Upload to Your Channel',
      description:
        'Once approved, we securely publish to your YouTube channel using our authenticated connection.',
      features: [
        'Secure API connection',
        'Scheduled publishing',
        'Upload confirmation'
      ]
    }
  ]

  return (
    <section id='how-it-works' className='py-24 px-6 '>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            The Workflow Creators Love
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Simple, secure, and designed for professional content creation teams
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-12'>
          {steps.map((step, index) => (
            <div key={index} className='relative'>
              <div className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover-lift h-full'>
                <div className='flex items-center justify-center mb-6'>
                  <div className='w-16 h-16 bg-gradient-to-br from-primary-red to-primary-red-hover rounded-2xl flex items-center justify-center mr-4'>
                    <step.icon className='h-8 w-8 text-white' />
                  </div>
                </div>

                <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                  {step.title}
                </h3>

                <p className='text-gray-600 mb-6 leading-relaxed'>
                  {step.description}
                </p>

                <ul className='space-y-2'>
                  {step.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className='flex items-center text-gray-600'
                    >
                      <div className='w-2 h-2 bg-youtube-red rounded-full mr-3'></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-gray-200 transform -translate-y-1/2'></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
