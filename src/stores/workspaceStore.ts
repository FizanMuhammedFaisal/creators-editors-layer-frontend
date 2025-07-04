import { Workspace } from '@/types/workspace'
import { create } from 'zustand'

interface WorkspaceState {
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  setWorkspaces: (workspaces: Workspace[]) => void
  setCurrentWorkspace: (workspace: Workspace | null) => void
  addWorkspace: (workspace: Workspace) => void
}

export const useWorkspaceStore = create<WorkspaceState>(set => ({
  workspaces: [],
  currentWorkspace: null,
  setWorkspaces: workspaces => set({ workspaces }),
  setCurrentWorkspace: workspace => set({ currentWorkspace: workspace }),
  addWorkspace: workspace =>
    set(state => ({
      workspaces: [...state.workspaces, workspace]
    }))
}))
