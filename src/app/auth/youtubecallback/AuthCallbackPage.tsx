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
      const error = searchParams.get('error')

      if (error) {
        console.error('OAuth error:', error)
        router.push('/dashboard/org-add?auth=error')
        return
      }

      if (!code) {
        console.error('No authorization code found')
        router.push('/dashboard/org-add?auth=error')
        return
      }

      try {
        // Add withCredentials to include cookies
        const response = await api.get(
          `/api/auth/oauth2callback?code=${encodeURIComponent(code)}`,
          {
            withCredentials: true
          }
        )

        if (response.status === 200) {
          const redirectUrl = response.data
          if (redirectUrl) {
            window.location.href = redirectUrl
          } else {
            router.push('/dashboard/org-add?auth=success')
          }
        } else {
          throw new Error(`Unexpected status: ${response.status}`)
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        router.push('/dashboard/org-add?auth=error')
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4'></div>
        <p>Completing YouTube authorization...</p>
      </div>
    </div>
  )
}
