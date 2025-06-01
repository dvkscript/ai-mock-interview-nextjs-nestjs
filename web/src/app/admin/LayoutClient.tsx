"use client"
import { GetProfile } from '@/actions/auth.action'
import ClientOnly from '@/components/common/ClientOnly'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useUserStore } from '@/stores/userStore'
import { Bell } from 'lucide-react'
import { useEffect } from 'react'

export default function LayoutClient({
    children,
    profile
}: {
    children: React.ReactNode;
    profile: GetProfile | null;
}) {
    const { setProfile } = useUserStore()

    useEffect(() => {
        setProfile(profile)
    }, [profile, setProfile]);

    return (
        <ClientOnly>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4 w-full ">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mx-2 data-[orientation=vertical]:h-4"
                            />
                            <div className='ml-auto'>
                                <Button
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    <Bell />
                                </Button>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 p-4 sm:p-6">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ClientOnly>
    )
} 