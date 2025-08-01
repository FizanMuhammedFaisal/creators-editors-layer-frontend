'use client'

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import {
  Play,
  Upload,
  Check,
  X,
  Eye,
  Calendar,
  User,
  Search,
  UserPlus,
  UserMinus,
  Filter,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import api from '@/lib/api'
import { useWorkspaceStore } from '@/stores/workspaceStore'

export default function SubmissionsPage() {
  const { currentWorkspaceId } = useWorkspaceStore()
  const workspaceId = currentWorkspaceId
  const queryClient = useQueryClient()

  // State for dialogs and forms
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Form states
  const [newSubmission, setNewSubmission] = useState({
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: ''
  })
  const [userEmail, setUserEmail] = useState('')
  const [foundUser, setFoundUser] = useState(null)

  // Fetch submissions - FIXED API ROUTE
  const { data: submissions, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ['submissions', workspaceId],
    queryFn: async () => {
      const response = await api.get(
        `/api/workspaces/${workspaceId}/submissions`
      )
      return response.data.data
    }
  })

  // Fetch workspace info - FIXED API ROUTE
  const { data: workspace } = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: async () => {
      const response = await api.get(`/api/workspaces/${workspaceId}`)
      return response.data
    }
  })

  // Fetch current user info to check permissions
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get('/api/user/me') // Assuming you have this endpoint
      return response.data
    }
  })

  // Create submission mutation - FIXED API ROUTE
  const createSubmissionMutation = useMutation({
    mutationFn: async submissionData => {
      const response = await api.post(
        `/api/workspaces/${workspaceId}/submissions`,
        submissionData
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['submissions', workspaceId])
      setIsCreateDialogOpen(false)
      setNewSubmission({
        title: '',
        description: '',
        video_url: '',
        thumbnail_url: ''
      })
      toast({
        title: 'Success',
        description: 'Submission created successfully!'
      })
    },
    onError: error => {
      toast({
        title: 'Error',
        description:
          error.response?.data?.error || 'Failed to create submission',
        variant: 'destructive'
      })
    }
  })

  // Approve submission mutation - FIXED API ROUTE
  const approveSubmissionMutation = useMutation({
    mutationFn: async submissionId => {
      const response = await api.post(
        `/api/workspaces/workspaces/${workspaceId}/submissions/${submissionId}/approve`
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['submissions', workspaceId])
      toast({ title: 'Success', description: 'Submission approved!' })
    },
    onError: error => {
      toast({
        title: 'Error',
        description:
          error.response?.data?.error || 'Failed to approve submission',
        variant: 'destructive'
      })
    }
  })

  // Reject submission mutation - FIXED API ROUTE
  const rejectSubmissionMutation = useMutation({
    mutationFn: async submissionId => {
      const response = await api.post(
        `/api/workspaces/workspaces/${workspaceId}/submissions/${submissionId}/reject`
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['submissions', workspaceId])
      toast({ title: 'Success', description: 'Submission rejected!' })
    },
    onError: error => {
      toast({
        title: 'Error',
        description:
          error.response?.data?.error || 'Failed to reject submission',
        variant: 'destructive'
      })
    }
  })

  // Search user mutation - FIXED API ROUTE
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
    onError: error => {
      setFoundUser(null)
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'User not found',
        variant: 'destructive'
      })
    }
  })

  // Add member mutation - FIXED API ROUTE
  const addMemberMutation = useMutation({
    mutationFn: async userId => {
      const response = await api.post(`/api/workspaces/${workspaceId}/add`, {
        userId
      })
      return response.data
    },
    onSuccess: () => {
      setIsAddMemberDialogOpen(false)
      setUserEmail('')
      setFoundUser(null)
      toast({ title: 'Success', description: 'User added to workspace!' })
    },
    onError: error => {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to add user',
        variant: 'destructive'
      })
    }
  })

  // Filter submissions
  const filteredSubmissions =
    submissions?.filter(submission => {
      const matchesStatus =
        statusFilter === 'all' || submission.status === statusFilter
      const matchesSearch =
        submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesStatus && matchesSearch
    }) || []

  // Handle create submission
  const handleCreateSubmission = e => {
    e.preventDefault()
    createSubmissionMutation.mutate(newSubmission)
  }

  // Handle search user
  const handleSearchUser = () => {
    if (userEmail.trim()) {
      searchUserMutation.mutate(userEmail.trim())
    }
  }

  // Handle view submission - FIXED API ROUTE
  const handleViewSubmission = async submissionId => {
    try {
      const response = await api.get(
        `/api/workspaces/${workspaceId}/submissions/${submissionId}`
      )
      setSelectedSubmission(response.data.data)
      setIsViewDialogOpen(true)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load submission',
        variant: 'destructive'
      })
    }
  }

  // Get status badge color
  const getStatusBadgeColor = status => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  // Check if current user is workspace owner
  const isWorkspaceOwner =
    workspace && currentUser && workspace.creator_id === currentUser.id

  if (isLoadingSubmissions) {
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
          <h1 className='text-2xl font-bold'>Submissions</h1>
          <p className='text-gray-600'>
            Manage video submissions for your workspace
          </p>
        </div>
        <div className='flex gap-2'>
          {/* Only workspace owner can add members */}
          {isWorkspaceOwner && (
            <Dialog
              open={isAddMemberDialogOpen}
              onOpenChange={setIsAddMemberDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant='outline' size='sm'>
                  <UserPlus className='h-4 w-4 mr-2' />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Workspace Member</DialogTitle>
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
                      />
                      <Button
                        onClick={handleSearchUser}
                        disabled={searchUserMutation.isLoading}
                      >
                        Search
                      </Button>
                    </div>
                  </div>

                  {foundUser && (
                    <Card>
                      <CardContent className='p-4'>
                        <div className='flex items-center justify-between'>
                          <div>
                            <p className='font-medium'>{foundUser.name}</p>
                            <p className='text-sm text-gray-600'>
                              {foundUser.email}
                            </p>
                          </div>
                          <Button
                            onClick={() =>
                              addMemberMutation.mutate(foundUser.id)
                            }
                            disabled={addMemberMutation.isLoading}
                          >
                            Add to Workspace
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* All workspace members can create submissions */}
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Upload className='h-4 w-4 mr-2' />
                New Submission
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
              <DialogHeader>
                <DialogTitle>Create New Submission</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateSubmission} className='space-y-4'>
                <div>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    id='title'
                    value={newSubmission.title}
                    onChange={e =>
                      setNewSubmission({
                        ...newSubmission,
                        title: e.target.value
                      })
                    }
                    placeholder='Enter video title'
                    required
                  />
                </div>

                <div>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    value={newSubmission.description}
                    onChange={e =>
                      setNewSubmission({
                        ...newSubmission,
                        description: e.target.value
                      })
                    }
                    placeholder='Enter video description'
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor='video_url'>Video URL</Label>
                  <Input
                    id='video_url'
                    value={newSubmission.video_url}
                    onChange={e =>
                      setNewSubmission({
                        ...newSubmission,
                        video_url: e.target.value
                      })
                    }
                    placeholder='https://youtube.com/watch?v=...'
                    required
                  />
                </div>

                <div>
                  <Label htmlFor='thumbnail_url'>Thumbnail URL</Label>
                  <Input
                    id='thumbnail_url'
                    value={newSubmission.thumbnail_url}
                    onChange={e =>
                      setNewSubmission({
                        ...newSubmission,
                        thumbnail_url: e.target.value
                      })
                    }
                    placeholder='https://example.com/thumbnail.jpg'
                  />
                </div>

                <div className='flex justify-end gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    disabled={createSubmissionMutation.isLoading}
                  >
                    {createSubmissionMutation.isLoading
                      ? 'Creating...'
                      : 'Create Submission'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className='flex items-center gap-4'>
        <div className='flex-1'>
          <Input
            placeholder='Search submissions...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='max-w-sm'
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='approved'>Approved</SelectItem>
            <SelectItem value='rejected'>Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submissions Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filteredSubmissions.map(submission => (
          <Card
            key={submission.id}
            className='hover:shadow-md transition-shadow'
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <CardTitle className='text-lg line-clamp-2'>
                    {submission.title}
                  </CardTitle>
                  <p className='text-sm text-gray-600 mt-1'>
                    {new Date(submission.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={getStatusBadgeColor(submission.status)}>
                  {submission.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className='pt-0'>
              {submission.thumbnail_url && (
                <div className='aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden'>
                  <img
                    src={submission.thumbnail_url}
                    alt={submission.title}
                    className='w-full h-full object-cover'
                  />
                </div>
              )}

              <p className='text-sm text-gray-600 line-clamp-2 mb-4'>
                {submission.description}
              </p>

              <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleViewSubmission(submission.id)}
                  >
                    <Eye className='h-4 w-4' />
                  </Button>

                  {submission.video_url && (
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() =>
                        window.open(submission.video_url, '_blank')
                      }
                    >
                      <ExternalLink className='h-4 w-4' />
                    </Button>
                  )}
                </div>

                {/* Only workspace owner can approve/reject */}
                {submission.status === 'pending' && isWorkspaceOwner && (
                  <div className='flex gap-1'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-green-600 hover:bg-green-50'
                      onClick={() =>
                        approveSubmissionMutation.mutate(submission.id)
                      }
                      disabled={approveSubmissionMutation.isLoading}
                    >
                      <Check className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-red-600 hover:bg-red-50'
                      onClick={() =>
                        rejectSubmissionMutation.mutate(submission.id)
                      }
                      disabled={rejectSubmissionMutation.isLoading}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className='text-center py-12'>
          <Upload className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No submissions found
          </h3>
          <p className='text-gray-600 mb-4'>
            {statusFilter === 'all'
              ? 'Get started by creating your first submission.'
              : `No submissions with status "${statusFilter}" found.`}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Create First Submission
          </Button>
        </div>
      )}

      {/* View Submission Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>

          {selectedSubmission && (
            <div className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-medium text-lg mb-2'>
                    {selectedSubmission.title}
                  </h3>
                  <div className='flex items-center gap-2 mb-4'>
                    <Badge
                      className={getStatusBadgeColor(selectedSubmission.status)}
                    >
                      {selectedSubmission.status}
                    </Badge>
                    <span className='text-sm text-gray-600'>
                      {new Date(
                        selectedSubmission.submitted_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <p className='text-gray-700 mb-4'>
                    {selectedSubmission.description}
                  </p>

                  <div className='flex gap-2'>
                    {selectedSubmission.video_url && (
                      <Button
                        variant='outline'
                        onClick={() =>
                          window.open(selectedSubmission.video_url, '_blank')
                        }
                      >
                        <ExternalLink className='h-4 w-4 mr-2' />
                        Watch Video
                      </Button>
                    )}

                    {/* Only workspace owner can approve/reject */}
                    {selectedSubmission.status === 'pending' &&
                      isWorkspaceOwner && (
                        <>
                          <Button
                            variant='outline'
                            className='text-green-600 hover:bg-green-50'
                            onClick={() => {
                              approveSubmissionMutation.mutate(
                                selectedSubmission.id
                              )
                              setIsViewDialogOpen(false)
                            }}
                          >
                            <Check className='h-4 w-4 mr-2' />
                            Approve
                          </Button>
                          <Button
                            variant='outline'
                            className='text-red-600 hover:bg-red-50'
                            onClick={() => {
                              rejectSubmissionMutation.mutate(
                                selectedSubmission.id
                              )
                              setIsViewDialogOpen(false)
                            }}
                          >
                            <X className='h-4 w-4 mr-2' />
                            Reject
                          </Button>
                        </>
                      )}
                  </div>
                </div>

                <div>
                  {selectedSubmission.thumbnail_url && (
                    <div className='aspect-video bg-gray-100 rounded-lg overflow-hidden'>
                      <img
                        src={selectedSubmission.thumbnail_url}
                        alt={selectedSubmission.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
