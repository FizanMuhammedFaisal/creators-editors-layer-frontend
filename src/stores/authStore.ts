import { create } from 'zustand'
import { toast } from 'sonner'
import { supabase } from '../lib/supabaseClient'
type SignupResult =
  | { success: true; needsConfirmation: true }
  | { success: true; needsConfirmation: false }
  | { success: false }
interface AuthState {
  user: User | null
  isLoading: boolean
  init: () => Promise<void>
  login: (credentials: { email: string; password: string }) => Promise<void>
  signup: (credentials: {
    name: string
    email: string
    password: string
  }) => Promise<SignupResult>
  logout: () => Promise<void>
  setUser: (user: User | null) => void
}

import type { User } from '@supabase/supabase-js'

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isLoading: true,

  init: async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession()
    set({ user: session?.user ?? null, isLoading: false })
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
        set({ user: session?.user ?? null })
      }

      if (event === 'SIGNED_OUT') {
        set({ user: null })
      }
    })
  },
  setUser: (user: User | null) => set({ user }),
  login: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error('Login failed: ' + error.message)
      throw error
    }

    set({ user: data.user })
    toast.success('Logged in successfully')
  },
  signup: async ({ name, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback',
        data: { name }
      }
    })

    if (error) {
      toast.error('Signup failed: ' + error.message)
      return { success: false }
    }

    if (!data.session) {
      toast.info('Check your email to confirm your account.')
      return { success: true, needsConfirmation: true }
    }

    set({ user: data.user })
    toast.success('Signed up successfully')
    return { success: true, needsConfirmation: false }
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null })
    toast.info('Logged out')
  }
}))
