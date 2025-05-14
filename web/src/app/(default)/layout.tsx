"use client"
import ClientOnly from '@/components/common/ClientOnly'
import Container from '@/components/common/Container'
import Icons from '@/components/common/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { BellIcon, CreditCardIcon, LogOutIcon, UserCircleIcon, Settings, History, BarChart, HelpCircle, BookOpen, Shield } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { logout } from '@/actions/auth.action'
import { toast } from 'sonner'
import { useRouter } from 'next-nprogress-bar'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const handleLogout = useCallback(async () => {
        const toastId = toast.loading("Đang đăng xuất...");
        const res = await logout();
        toast.dismiss(toastId);
        if (!res.ok) {
            return toast.error(res.message)
        }
        router.refresh()
        // router.push("/")
    }, [router]);



    return (
        <ClientOnly>
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-gray-950/90 border-b border-blue-100/50 dark:border-blue-900/30 shadow-md dark:shadow-gray-900/20">
                <Container className="max-w-full mx-auto flex h-16 items-center justify-between px-4 sm:px-8 relative">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-full animate-pulse"></div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                    </div>

                    {/* Logo area */}
                    <div className="flex items-center z-10">
                        <Link
                            href="/"
                            className="flex items-center group relative"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-white dark:bg-gray-900 rounded-full p-1.5">
                                <Icons.logo size={24} className='text-blue-400'></Icons.logo>
                            </div>
                            <span className="ml-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                                AI Mock Interview
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6 z-10">
                        <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                            Trang chủ
                        </Link>
                        <Link href="/history" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                            Lịch sử
                        </Link>
                        <Link href="/analytics" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                            Phân tích
                        </Link>
                        <Link href="/docs" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                            Tài liệu
                        </Link>
                    </nav>

                    {/* Auth buttons */}
                    <div className="flex items-center gap-4 z-10">
                        <Button variant="ghost" size="icon" className="relative">
                            <BellIcon className="h-5 w-5" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='select-none outline-none'>
                                <Avatar className="size-10 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all">
                                    <AvatarImage src={"https://github.com/shadcn.png"} alt={"@shadcn"} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side={"bottom"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={"https://github.com/shadcn.png"} alt={"@shadcn"} />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                cn
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                adfa
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="flex items-center">
                                            <UserCircleIcon className="mr-2 h-4 w-4" />
                                            Hồ sơ
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/history" className="flex items-center">
                                            <History className="mr-2 h-4 w-4" />
                                            Lịch sử
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/analytics" className="flex items-center">
                                            <BarChart className="mr-2 h-4 w-4" />
                                            Phân tích
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/docs" className="flex items-center">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Tài liệu
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings" className="flex items-center">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Cài đặt
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/billing" className="flex items-center">
                                            <CreditCardIcon className="mr-2 h-4 w-4" />
                                            Thanh toán
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/support" className="flex items-center">
                                            <HelpCircle className="mr-2 h-4 w-4" />
                                            Hỗ trợ
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/admin" className="flex items-center">
                                        <Shield className="mr-2 h-4 w-4" />
                                        Quản trị
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                >
                                    <LogOutIcon className="mr-2 h-4 w-4" />
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </Container>
            </header>
            <main>
                {children}
            </main>
        </ClientOnly>
    )
}

export default DefaultLayout