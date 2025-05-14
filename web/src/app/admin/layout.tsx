"use client"
import ClientOnly from '@/components/common/ClientOnly'
import Container from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarNavItems = [
  {
    title: 'Tổng quan',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Người dùng',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Phản hồi',
    href: '/admin/feedback',
    icon: MessageSquare,
  },
  {
    title: 'Phỏng vấn',
    href: '/admin/interviews',
    icon: FileText,
  },
  {
    title: 'Phân tích',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Nội dung',
    href: '/admin/content',
    icon: FileText,
  },
  {
    title: 'Cài đặt',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    title: 'Phân quyền',
    href: '/admin/roles',
    icon: Shield,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <ClientOnly>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block lg:w-72">
          <div className="flex h-full flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link href="/admin" className="flex items-center gap-2 font-semibold">
                <Shield className="h-6 w-6" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
            <ScrollArea className="flex-1 px-3">
              <div className="space-y-1 p-2">
                {sidebarNavItems.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      pathname === item.href && 'bg-gray-100 dark:bg-gray-800'
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-auto p-4">
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
            >
              <Shield className="h-6 w-6" />
            </Button>
            <div className="flex flex-1 items-center justify-end gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </ClientOnly>
  )
} 