import { AppSidebar } from '@/components/app-sidebar'
import AuthWrapper from '@/components/auth/AuthWrapper'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { DashboardBreadcrumb } from '@/components/layout/dashboard-breadcrumb'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DashBoard',
  description: 'Dashboard of the application'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
              <DashboardBreadcrumb />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
