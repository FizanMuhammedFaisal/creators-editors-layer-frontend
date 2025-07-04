import api from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Play,
  Shield,
  Users,
  Youtube
} from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

export function WorkspaceOnboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to YuFlow',
      component: <WelcomeStep onNext={() => setCurrentStep(1)} />
    },
    {
      id: 'workspace-explanation',
      title: 'What is a Workspace?',
      component: (
        <WorkspaceExplanation
          onNext={() => setCurrentStep(2)}
          onBack={() => setCurrentStep(0)}
        />
      )
    },
    {
      id: 'channel-connection',
      title: 'Connect Your Channel',
      component: (
        <ChannelConnection
          onBack={() => setCurrentStep(1)}
          onComplete={onComplete}
        />
      )
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Progress Bar */}
        <div className='max-w-2xl mx-auto mb-12'>
          <div className='flex items-center justify-between mb-4'>
            {steps.map((step, index) => (
              <div key={step.id} className='flex items-center'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className='w-4 h-4' />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      index < currentStep ? 'bg-red-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className='text-center'>
            <span className='text-sm text-gray-600'>
              Step {currentStep + 1} of {steps.length}:{' '}
              {steps[currentStep].title}
            </span>
          </div>
        </div>

        {/* Current Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[currentStep].component}
        </motion.div>
      </div>
    </div>
  )
}

function WelcomeStep({ onNext }) {
  return (
    <div className='max-w-2xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white rounded-2xl p-8 border border-gray-100 shadow-lg text-center'
      >
        <div className='mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6'>
          <Youtube className='w-10 h-10 text-red-500' />
        </div>

        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
          Welcome to YuFlow! 🎉
        </h1>

        <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
          The smart way to manage your YouTube content workflow. Let's get you
          set up in just a few simple steps.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='p-4 bg-red-50 rounded-lg'>
            <Users className='w-6 h-6 text-red-500 mx-auto mb-2' />
            <h3 className='font-semibold text-gray-900 mb-1'>Collaborate</h3>
            <p className='text-sm text-gray-600'>Work with editors safely</p>
          </div>
          <div className='p-4 bg-red-50 rounded-lg'>
            <Shield className='w-6 h-6 text-red-500 mx-auto mb-2' />
            <h3 className='font-semibold text-gray-900 mb-1'>
              Stay in Control
            </h3>
            <p className='text-sm text-gray-600'>You approve everything</p>
          </div>
          <div className='p-4 bg-red-50 rounded-lg'>
            <Play className='w-6 h-6 text-red-500 mx-auto mb-2' />
            <h3 className='font-semibold text-gray-900 mb-1'>Auto-Publish</h3>
            <p className='text-sm text-gray-600'>Direct to YouTube</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className='inline-flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 text-lg'
        >
          Let's Get Started
          <ArrowRight className='w-5 h-5' />
        </motion.button>
      </motion.div>
    </div>
  )
}

function WorkspaceExplanation({ onNext, onBack }) {
  return (
    <div className='max-w-3xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white rounded-2xl p-8 border border-gray-100 shadow-lg'
      >
        <div className='text-center mb-8'>
          <div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
            <Building2 className='w-8 h-8 text-red-500' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            What is a Workspace?
          </h2>
          <p className='text-gray-600'>
            Think of it as your YouTube channel's control center
          </p>
        </div>

        <div className='space-y-6 mb-8'>
          <div className='flex items-start gap-4 p-4 bg-red-50 rounded-lg'>
            <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0'>
              <Youtube className='w-4 h-4 text-white' />
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 mb-1'>
                Your YouTube Channel = Your Workspace
              </h3>
              <p className='text-gray-600'>
                Each workspace represents one YouTube channel. If you have
                multiple channels, you can create multiple workspaces.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4 p-4 bg-blue-50 rounded-lg'>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0'>
              <Users className='w-4 h-4 text-white' />
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 mb-1'>
                Invite Your Team
              </h3>
              <p className='text-gray-600'>
                Add editors, designers, and collaborators to your workspace.
                They can upload and submit content without accessing your
                channel directly.
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4 p-4 bg-green-50 rounded-lg'>
            <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
              <Shield className='w-4 h-4 text-white' />
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 mb-1'>
                You Stay in Control
              </h3>
              <p className='text-gray-600'>
                All submissions need your approval before publishing. Your team
                can't post anything without your permission.
              </p>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 rounded-lg p-6 mb-8'>
          <h3 className='font-semibold text-gray-900 mb-3'>How it works:</h3>
          <div className='space-y-2 text-gray-600'>
            <div className='flex items-center gap-2'>
              <span className='w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium'>
                1
              </span>
              <span>Connect your YouTube channel to create a workspace</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium'>
                2
              </span>
              <span>Invite editors and collaborators</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium'>
                3
              </span>
              <span>They upload videos to your workspace</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium'>
                4
              </span>
              <span>You review and approve</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium'>
                5
              </span>
              <span>We publish directly to your YouTube channel</span>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200'
          >
            Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className='inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200'
          >
            Connect My Channel
            <ArrowRight className='w-5 h-5' />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

function ChannelConnection({ onBack, onComplete }) {
  const [isConnecting, setIsConnecting] = useState(false)
  const handleConnect = () => {
    window.location.href = 'http://localhost:3000/api/auth/youtube'
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white rounded-2xl p-8 border border-gray-100 shadow-lg text-center'
      >
        <div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6'>
          <Youtube className='w-8 h-8 text-red-500' />
        </div>

        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Connect Your YouTube Channel
        </h2>

        <p className='text-gray-600 mb-8 leading-relaxed'>
          We'll securely connect to your YouTube channel to create your
          workspace. This allows us to publish approved content directly to your
          channel.
        </p>

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8'>
          <div className='flex items-start gap-3'>
            <Shield className='w-5 h-5 text-blue-500 mt-0.5' />
            <div className='text-left'>
              <h3 className='font-semibold text-blue-900 mb-1'>
                Safe & Secure
              </h3>
              <p className='text-sm text-blue-700'>
                We use YouTube's official OAuth system. We can only publish
                videos you approve - we cannot access your personal data or make
                unauthorized changes.
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-4 mb-8'>
          <div className='flex items-center gap-3 text-gray-600'>
            <CheckCircle className='w-5 h-5 text-green-500' />
            <span>Create and manage video uploads</span>
          </div>
          <div className='flex items-center gap-3 text-gray-600'>
            <CheckCircle className='w-5 h-5 text-green-500' />
            <span>Publish approved content to your channel</span>
          </div>
          <div className='flex items-center gap-3 text-gray-600'>
            <CheckCircle className='w-5 h-5 text-green-500' />
            <span>Manage video metadata and thumbnails</span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200'
          >
            Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConnect}
            disabled={isConnecting}
            className='inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50'
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
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
