export interface Workspace {
  id: string
  name: string
  creator_id: string
  created_at: string
}

export interface CreateWorkspaceRequest {
  name: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}
