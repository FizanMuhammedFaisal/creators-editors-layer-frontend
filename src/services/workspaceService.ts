import api from '@/lib/api'
import {
  ApiResponse,
  CreateWorkspaceRequest,
  Workspace
} from '@/types/workspace'

export class WorkspaceService {
  static async getWorkspaces(): Promise<Workspace> {
    const response = await api.get('/api/workspaces')
    return response.data
  }

  static async createWorkspace(
    data: CreateWorkspaceRequest
  ): Promise<ApiResponse<Workspace>> {
    const response = await api.post('/api/workspaces', data)
    return response.data
  }

  static async getWorkspaceById(id: string): Promise<Workspace> {
    const response = await api.get(`/api/workspaces/${id}`)
    return response.data
  }

  static async updateWorkspace(
    id: string,
    data: Partial<CreateWorkspaceRequest>
  ): Promise<ApiResponse<Workspace>> {
    const response = await api.put(`/api/workspaces/${id}`, data)
    return response.data
  }

  static async deleteWorkspace(id: string): Promise<void> {
    await api.delete(`/api/workspaces/${id}`)
  }
}
