import api from '@/lib/api'
import { CreateSubmissionRequest, Submission } from '@/types/submission'

export class SubmissionService {
  static async getWorkspaceSubmissions(
    workspaceId: string
  ): Promise<{ success: boolean; data: Submission[] }> {
    const response = await api.get(`/api/workspaces/${workspaceId}/submissions`)
    return response.data
  }

  static async getSubmissionById(
    workspaceId: string,
    submissionId: string
  ): Promise<Submission> {
    const response = await api.get(
      `/api/workspaces/${workspaceId}/submissions/${submissionId}`
    )
    return response.data
  }

  static async createSubmission(
    workspaceId: string,
    data: CreateSubmissionRequest
  ): Promise<{ success: boolean; data: Submission }> {
    const response = await api.post(
      `/api/workspaces/${workspaceId}/submissions`,
      data
    )
    return response.data
  }

  static async updateSubmission(
    workspaceId: string,
    submissionId: string,
    data: Partial<CreateSubmissionRequest>
  ): Promise<{ success: boolean; data: Submission }> {
    const response = await api.put(
      `/api/workspaces/${workspaceId}/submissions/${submissionId}`,
      data
    )
    return response.data
  }

  static async deleteSubmission(
    workspaceId: string,
    submissionId: string
  ): Promise<void> {
    await api.delete(
      `/api/workspaces/${workspaceId}/submissions/${submissionId}`
    )
  }
}
