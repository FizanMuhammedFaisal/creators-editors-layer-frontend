'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'

export default function AuthCallbackPage() {
  const router = useRouter()
  const setUser = useAuthStore(s => s.setUser)

  useEffect(() => {
    const handleCallback = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()

      if (error || !session) {
        toast.error('Failed to confirm email or login.')
        return
      }

      setUser(session.user)
      toast.success('Email confirmed! You are now logged in.')
      router.replace('/dashboard')
    }

    handleCallback()
  }, [router, setUser])

  return <p className='text-center mt-20'>Confirming your email...</p>
}
