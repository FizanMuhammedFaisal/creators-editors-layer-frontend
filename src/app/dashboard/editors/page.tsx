'use client'

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  UserPlus,
  Search,
  User,
  Crown,
  MoreHorizontal,
  Trash2,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { toast } from 'sonner'
import api from '@/lib/api'
import { useWorkspaceStore } from '@/stores/workspaceStore'

export default function EditorsPage() {
  const { currentWorkspaceId } = useWorkspaceStore()
  const workspaceId = currentWorkspaceId
  const queryClient = useQueryClient()

  // State for dialogs and forms
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [foundUser, setFoundUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch workspace members using the actual API
  const { data: workspaceMembers, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['workspace-members', workspaceId],
    queryFn: async () => {
      const response = await api.get(`/api/workspaces/${workspaceId}/members`)
      return response.data.data
    },
    enabled: !!workspaceId
  })

  // Fetch current workspace info
  const { data: workspace } = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: async () => {
      // Mock workspace data since there's no single workspace endpoint
      return {
        id: workspaceId,
        name: 'My Workspace',
        creator_id: 'current-user-id',
        created_at: '2024-01-01T00:00:00Z'
      }
    },
    enabled: !!workspaceId
  })

  // Search user mutation
  const searchUserMutation = useMutation({
    mutationFn: async email => {
      const response = await api.get(
        `/api/workspaces/${workspaceId}/search-users?email=${email}`
      )
      return response.data.data
    },
    onSuccess: data => {
      setFoundUser(data)
    },
    onError: () => {
      setFoundUser(null)
      toast.error('User not found')
    }
  })

  // Add member mutation
  const addMemberMutation = useMutation({
    mutationFn: async userId => {
      const response = await api.post(`/api/workspaces/${workspaceId}/add`, {
        userId
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['workspace-members', workspaceId])
      setIsAddMemberDialogOpen(false)
      setUserEmail('')
      setFoundUser(null)
      toast.success('Editor added to workspace successfully!')
    },
    onError: error => {
      toast.error(error.response?.data?.error || 'Failed to add editor')
    }
  })

  // Remove member mutation
  const removeMemberMutation = useMutation({
    mutationFn: async userId => {
      const response = await api.delete(
        `/api/workspaces/${workspaceId}/remove`,
        {
          data: { userId }
        }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['workspace-members', workspaceId])
      toast.success('Editor removed from workspace successfully!')
    },
    onError: error => {
      toast.error(error.response?.data?.error || 'Failed to remove editor')
    }
  })

  // Handle search user
  const handleSearchUser = () => {
    if (userEmail.trim()) {
      searchUserMutation.mutate(userEmail.trim())
    }
  }

  // Handle remove member
  const handleRemoveMember = userId => {
    if (window.confirm('Are you sure you want to remove this editor?')) {
      removeMemberMutation.mutate(userId)
    }
  }

  // Filter members based on search
  const filteredMembers =
    workspaceMembers?.filter(
      member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

  if (isLoadingMembers) {
    return (
      <div className='flex items-center justify-center h-96'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Editors</h1>
          <p className='text-gray-600'>
            Manage editors and collaborators for your workspace
          </p>
        </div>

        <Dialog
          open={isAddMemberDialogOpen}
          onOpenChange={setIsAddMemberDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <UserPlus className='h-4 w-4 mr-2' />
              Add Editor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Editor to Workspace</DialogTitle>
            </DialogHeader>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='email'>User Email</Label>
                <div className='flex gap-2'>
                  <Input
                    id='email'
                    type='email'
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    placeholder='Enter user email'
                    onKeyPress={e => e.key === 'Enter' && handleSearchUser()}
                  />
                  <Button
                    onClick={handleSearchUser}
                    disabled={searchUserMutation.isLoading}
                  >
                    <Search className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              {foundUser && (
                <Card>
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                          <User className='h-5 w-5 text-gray-600' />
                        </div>
                        <div>
                          <p className='font-medium'>{foundUser.name}</p>
                          <p className='text-sm text-gray-600'>
                            {foundUser.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => addMemberMutation.mutate(foundUser.id)}
                        disabled={addMemberMutation.isLoading}
                      >
                        {addMemberMutation.isLoading
                          ? 'Adding...'
                          : 'Add Editor'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className='flex items-center gap-4'>
        <div className='flex-1'>
          <Input
            placeholder='Search editors...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='max-w-sm'
          />
        </div>
        <Badge variant='secondary'>
          {filteredMembers.length}{' '}
          {filteredMembers.length === 1 ? 'Editor' : 'Editors'}
        </Badge>
      </div>

      {/* Editors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Editors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Editor</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='w-[100px]'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
                        <User className='h-4 w-4 text-gray-600' />
                      </div>
                      <div>
                        <p className='font-medium'>{member.name}</p>
                        <p className='text-sm text-gray-600'>{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Shield className='h-4 w-4 text-blue-500' />
                      <span className='capitalize'>Editor</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline' className='text-green-600'>
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                          onClick={() => handleRemoveMember(member.id)}
                          className='text-red-600'
                          disabled={removeMemberMutation.isLoading}
                        >
                          <Trash2 className='h-4 w-4 mr-2' />
                          Remove Editor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredMembers.length === 0 && (
            <div className='text-center py-8'>
              <UserPlus className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No editors found
              </h3>
              <p className='text-gray-600 mb-4'>
                {searchQuery
                  ? `No editors match "${searchQuery}"`
                  : 'Start by adding editors to your workspace'}
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsAddMemberDialogOpen(true)}>
                  Add First Editor
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
