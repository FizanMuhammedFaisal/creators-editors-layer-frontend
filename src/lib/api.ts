import axios from 'axios'
import { supabase } from '../lib/supabaseClient'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 10000
})

api.interceptors.request.use(async config => {
  const { data, error } = await supabase.auth.getSession()

  if (error || !data.session) {
    // Optional: throw or redirect to login
    console.warn('No session or error getting session', error)
    return config
  }

  const accessToken = data.session.access_token
  config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

export default api
