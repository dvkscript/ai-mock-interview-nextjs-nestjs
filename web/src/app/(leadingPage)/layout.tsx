import ClientOnly from '@/components/common/ClientOnly'
import Container from '@/components/common/Container'
import Icons from '@/components/common/Icons'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClientOnly>
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-gray-950/90 border-b border-blue-100/50 dark:border-blue-900/30 shadow-md dark:shadow-gray-900/20">
                <Container className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 relative">
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

                    {/* Auth buttons */}
                    <div className="flex items-center gap-2 z-10">
                        <Link
                            href="/login"
                            className="relative inline-flex items-center justify-center px-4 py-2 font-medium text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 overflow-hidden group"
                        >
                            <span className="relative z-10">Đăng nhập</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/login"
                            className="relative inline-flex items-center justify-center px-4 py-2 font-medium rounded-xl overflow-hidden group"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition-all duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative z-10 text-white">Đăng ký</span>
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            className="inline-flex items-center justify-center ml-2 rounded-full p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300 md:hidden"
                            aria-label="Mở menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <line x1="4" x2="20" y1="12" y2="12"></line>
                                <line x1="4" x2="20" y1="6" y2="6"></line>
                                <line x1="4" x2="20" y1="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </Container>
            </header>
            <main>
                {children}
            </main>
        </ClientOnly>
    )
}

export default layout