'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import api from '@/lib/api'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      console.log(code)

      if (!code) {
        console.error('No auth code found in URL')
        return
      }

      try {
        const res = await api.get('/api/auth/oauth2callback', { code })
        console.log(res)
        if (res.status === 200) {
          router.push('/dashboard/org-add?auth=success')
        } else {
          router.push('/dashboard/org-add?auth=error')
        }
      } catch (err) {
        console.error('Failed to send code to backend:', err)
        router.push('/dashboard/org-add?auth=error')
      }
    }

    handleCallback()
  }, [searchParams, router])

  return <p className='text-center mt-20'>Setting you up...</p>
}
