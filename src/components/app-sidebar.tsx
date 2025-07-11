'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  Settings2,
  TicketCheck,
  Loader2,
  Plus
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavUser } from '@/components/nav-user'
import { OrganisationSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

import api from '@/lib/api'
import { useWorkspaceStore } from '@/stores/workspaceStore'
import { Workspace } from '@/types/workspace'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    workspaces,
    currentWorkspaceId,
    setWorkspaces,
    setCurrentWorkspaceId,
    setCurrentWorkspace
  } = useWorkspaceStore()

  const { data: workspacesData, isLoading: isLoadingWorkspaces } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await api.get('/api/workspaces')
      return response.data
    }
  })

  React.useEffect(() => {
    if (workspacesData) {
      setWorkspaces(workspacesData)
      if (!currentWorkspaceId && workspacesData.length > 0) {
        setCurrentWorkspaceId(workspacesData[0].id)
      }
    }
  }, [workspacesData])

  // Fetch current user data
  const { data: userData } = useQuery({
    queryKey: ['user-me'],
    queryFn: async () => {
      const response = await api.get('/api/auth/me')
      return response.data
    }
  })

  // Transform workspaces for OrganisationSwitcher
  const transformedWorkspaces =
    workspaces?.map(workspace => ({
      name: workspace.name,
      logo: GalleryVerticalEnd,
      plan: 'Workspace',
      id: workspace.id
    })) || []

  // Navigation items
  const navMain = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
      isActive: true
    },
    {
      title: 'Editors',
      url: '/dashboard/editors',
      icon: Bot
    },
    {
      title: 'Submissions',
      url: currentWorkspaceId
        ? `/dashboard/submissions`
        : '/dashboard/submissions',
      icon: TicketCheck
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#'
        },
        {
          title: 'Team',
          url: '#'
        },
        {
          title: 'Billing',
          url: '#'
        },
        {
          title: 'Limits',
          url: '#'
        }
      ]
    }
  ]

  const handleWorkspaceChange = (workspaceId: string) => {
    setCurrentWorkspaceId(workspaceId)
    const selectedWorkspace = workspaces.find(w => w.id === workspaceId)
    setCurrentWorkspace(selectedWorkspace || null)
  }

  const handleCreateWorkspace = () => {
    window.location.href = '/workspace/create'
  }

  // Loading state
  if (isLoadingWorkspaces) {
    return (
      <Sidebar collapsible='icon' {...props}>
        <SidebarHeader>
          <div className='flex items-center justify-center p-4'>
            <Loader2 className='h-6 w-6 animate-spin text-gray-500' />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className='flex items-center justify-center p-4'>
            <span className='text-sm text-gray-500'>Loading workspaces...</span>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className='flex items-center justify-center p-4'>
            <div className='h-8 w-8 bg-gray-200 rounded-full animate-pulse' />
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }
  console.log(workspaces)
  // No workspaces state
  if (!workspaces || workspaces.length === 0) {
    return (
      <Sidebar collapsible='icon' {...props}>
        <SidebarHeader>
          <div className='flex items-center justify-center p-4'>
            <GalleryVerticalEnd className='h-6 w-6 text-gray-400' />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className='flex flex-col items-center justify-center p-4 text-center space-y-4'>
            <div className='space-y-2'>
              <h3 className='text-sm font-medium text-gray-900'>
                No workspaces
              </h3>
              <p className='text-xs text-gray-500'>
                Create your first workspace to get started
              </p>
            </div>
            <Button
              size='sm'
              onClick={handleCreateWorkspace}
              className='w-full'
            >
              <Plus className='h-4 w-4 mr-2' />
              Create Workspace
            </Button>
          </div>
        </SidebarContent>
        <SidebarFooter>
          {userData && (
            <NavUser
              user={{
                name: userData.name || 'User',
                email: userData.email || '',
                avatar: userData.avatar || '/avatars/default.jpg'
              }}
            />
          )}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <OrganisationSwitcher
          organisations={transformedWorkspaces}
          currentOrganisationId={currentWorkspaceId}
          onOrganisationChange={handleWorkspaceChange}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {userData && (
          <NavUser
            user={{
              name: userData.name || 'User',
              email: userData.email || '',
              avatar: userData.avatar || '/avatars/default.jpg'
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
