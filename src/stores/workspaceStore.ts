import { Workspace } from '@/types/workspace'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WorkspaceState {
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  currentWorkspaceId: string | null
  setWorkspaces: (workspaces: Workspace[]) => void
  setCurrentWorkspace: (workspace: Workspace | null) => void
  setCurrentWorkspaceId: (workspaceId: string | null) => void
  addWorkspace: (workspace: Workspace) => void
  updateWorkspace: (workspaceId: string, updates: Partial<Workspace>) => void
  removeWorkspace: (workspaceId: string) => void
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      workspaces: [],
      currentWorkspace: null,
      currentWorkspaceId: null,

      setWorkspaces: workspaces => {
        console.log(workspaces)
        set({ workspaces })
      },

      setCurrentWorkspace: workspace =>
        set({
          currentWorkspace: workspace,
          currentWorkspaceId: workspace?.id || null
        }),

      setCurrentWorkspaceId: workspaceId => {
        const { workspaces } = get()
        const workspace = workspaces.find(w => w.id === workspaceId) || null
        set({
          currentWorkspaceId: workspaceId,
          currentWorkspace: workspace
        })
      },

      addWorkspace: workspace =>
        set(state => ({
          workspaces: [...state.workspaces, workspace]
        })),

      updateWorkspace: (workspaceId, updates) =>
        set(state => ({
          workspaces: state.workspaces.map(w =>
            w.id === workspaceId ? { ...w, ...updates } : w
          ),
          currentWorkspace:
            state.currentWorkspace?.id === workspaceId
              ? { ...state.currentWorkspace, ...updates }
              : state.currentWorkspace
        })),

      removeWorkspace: workspaceId =>
        set(state => ({
          workspaces: state.workspaces.filter(w => w.id !== workspaceId),
          currentWorkspace:
            state.currentWorkspace?.id === workspaceId
              ? null
              : state.currentWorkspace,
          currentWorkspaceId:
            state.currentWorkspaceId === workspaceId
              ? null
              : state.currentWorkspaceId
        }))
    }),
    {
      name: 'workspace-store',
      partialize: state => ({
        currentWorkspaceId: state.currentWorkspaceId
      })
    }
  )
)
