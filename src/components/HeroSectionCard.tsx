'use client'
import { WobbleCard } from '@/components/ui/wobble-card'

export default function HeroSectionCard() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4'>
      <WobbleCard
        containerClassName='col-span-1 lg:col-span-2 h-full bg-rose-50 min-h-[500px] lg:min-h-[400px] border-2 border-white hover:border-rose-100'
        className=''
      >
        <div className='max-w-sm relative z-10'>
          <h2 className='text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-gray-900'>
            Upload the Final Cut
          </h2>
          <p className='mt-4 text-left text-base/6 text-gray-600'>
            Your editor securely uploads the final video to our review platform
            — no downloads needed.
          </p>
        </div>
        <img
          src='/editor-upload.png'
          width={340}
          height={340}
          alt='Editor uploading the video'
          className='absolute right-4 lg:right-[1%] -bottom-2 lg:bottom-4 object-contain  opacity-90'
        />
      </WobbleCard>

      <WobbleCard
        containerClassName='col-span-1 min-h-[400px] bg-blue-50 border-2 border-white hover:border-blue-100'
        className=''
      >
        <div className='relative z-10'>
          <h2 className='max-w-80 text-left text-balance text-xl md:text-2xl  lg:text-3xl font-semibold tracking-[-0.015em] text-gray-900'>
            You Review & Approve
          </h2>
          <p className='mt-4 max-w-[26rem] text-left text-base/6 text-gray-600'>
            Watch, comment, and approve — all in one place. You're in control
            before anything goes live.
          </p>
        </div>
        <img
          src='/approving.png'
          width={220}
          height={200}
          alt='Review and approval interface'
          className='absolute -right-4 md:-right-[4%] lg:right-[10%] -bottom-1 object-contain  opacity-90'
        />
      </WobbleCard>

      <WobbleCard
        containerClassName='col-span-1 lg:col-span-3 bg-amber-50 min-h-[500px] lg:min-h-[350px] border-2 border-white hover:border-amber-100'
        className=''
      >
        <div className='max-w-sm relative z-10'>
          <h2 className='max-w-sm md:max-w-lg text-left text-balance text-xl md:text-2xl  lg:text-3xl font-semibold tracking-[-0.015em] text-gray-900'>
            We Upload to YouTube
          </h2>
          <p className='mt-4 max-w-[26rem] text-left text-base/6 text-gray-600'>
            Once approved, we automatically publish the video to your channel,
            safely and securely.
          </p>
        </div>
        <div className='absolute right-4 lg:right-[15%] -bottom-5 lg:-bottom-1'>
          <img
            src='/uploading.png'
            width={350}
            height={330}
            alt='YouTube upload process'
            className='object-contain opacity-90'
          />
        </div>
      </WobbleCard>
    </div>
  )
}
