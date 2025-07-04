'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuthStore()
  const navigate = useRouter()
  useEffect(() => {
    if (!isLoading && !user) {
      navigate.push('/')
    }
  }, [isLoading, user])

  if (isLoading) return <div>Loading...</div>
  if (!user) return null
  return <>{children}</>
}
