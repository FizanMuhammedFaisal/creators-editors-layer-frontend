'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

export default function AuthWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuthStore()
  const navigate = useRouter()
  useEffect(() => {
    if (!isLoading && user) {
      navigate.push('/dashboard')
    }
  }, [isLoading, user])

  if (isLoading) return <div>Loading</div>
  if (user) {
    navigate.replace('/dashboard')
    return <div>Redirecting...</div>
  }
  return <>{children}</>
}
