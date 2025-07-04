import { Suspense } from 'react'
import AuthCallbackPage from './AuthCallbackPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackPage />
    </Suspense>
  )
}
