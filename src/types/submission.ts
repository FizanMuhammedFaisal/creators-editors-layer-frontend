export interface Submission {
  id: string
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  status: 'pending' | 'approved' | 'rejected'
  uploader_id: string
  submitted_at: string
}

export interface CreateSubmissionRequest {
  title: string
  description: string
  video_url: string
  thumbnail_url?: string
}
