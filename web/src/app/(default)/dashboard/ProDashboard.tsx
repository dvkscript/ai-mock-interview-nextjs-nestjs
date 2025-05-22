import Link from 'next/link';
import Container from '@/components/common/Container';
import { GetJobAnalysis } from '@/actions/job.action';
import JobCard from './_components/JobCard';
import AddInterviewModal from './_components/AddInterviewModal';
import Hero from './_components/Hero';
import { Button } from '@/components/ui/button';
import { Plus, TriangleAlert } from 'lucide-react';

interface ProDashboardProps {
    data: GetJobAnalysis;
}

export default async function ProDashboard({ data }: ProDashboardProps) {
    console.log(data);

    const { count, rows, avgScore, completedCount, notCompletedCount } = data;


    return (
        <div>
            {/* Hero */}
            <Hero>
                <Container className='max-w-7xl mx-auto px-4 sm:px-0'>
                    <div className='py-8'>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                    Dashboard
                                </h1>
                                <p className="text-base text-blue-100 max-w-xl">
                                    Tạo và bắt đầu buổi phỏng vấn AI của bạn
                                </p>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <AddInterviewModal
                                    trigger={
                                        <Button
                                            size={"lg"}
                                            variant={"ghost"}
                                            className='border-white border-2 text-white font-bold'
                                        >
                                            Phỏng vấn mới
                                            <Plus />
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </Hero>
            {/* Main Content */}
            <div>
                <div className="py-6 sm:px-6 lg:px-8 pt-5 md:pt-10">
                    <Container className="max-w-7xl mx-auto px-4 sm:px-0">
                        {/* Stats Section */}
                        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Tổng số buổi phỏng vấn</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Đã hoàn thành</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedCount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-4">
                                        <TriangleAlert />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Chưa hoàn thành</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{notCompletedCount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Điểm trung bình</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgScore}/10</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nhắc nhở phỏng vấn sắp tới (nếu có) */}
                        <div className="mb-12">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/10 flex items-center justify-end overflow-hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64 text-white/10 transform translate-x-8" fill="currentColor" viewBox="0 0 512 512">
                                            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
                                        </svg>
                                    </div>
                                    <div className="relative px-6 py-8 md:flex md:items-center">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-6 flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-1">Sẵn sàng cho phỏng vấn tiếp theo?</h3>
                                            <p className="mb-3 text-white/80">Luyện tập thường xuyên giúp bạn tăng tối đa khả năng phỏng vấn.</p>
                                            <div className="flex flex-wrap gap-3">
                                                <AddInterviewModal
                                                    trigger={
                                                        <button
                                                            type="button"
                                                            className="inline-flex cursor-pointer items-center justify-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
                                                        >
                                                            Phỏng vấn mới
                                                        </button>
                                                    }
                                                />
                                                <button
                                                    className="inline-flex items-center cursor-pointer justify-center px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-colors"
                                                >
                                                    Xem gợi ý
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Previous Mock Interviews */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Phỏng vấn gần đây
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rows.map((interview) => (
                                    <JobCard
                                        key={interview.id}
                                        job={interview}
                                    />
                                ))}

                                {/* Thêm mới */}
                                <AddInterviewModal
                                    trigger={
                                        <div className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px] hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
                                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Thêm phỏng vấn mới</h3>
                                            <p className="text-gray-500 dark:text-gray-400">Bắt đầu một buổi phỏng vấn với AI</p>
                                        </div>
                                    }
                                />
                            </div>
                        </div>

                        {/* Các đề xuất bổ sung */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Các kỹ năng phỏng vấn cần cải thiện
                            </h2>
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                                <div className="space-y-5">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Giải quyết vấn đề</h3>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">65%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Phản xạ nhanh</h3>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">75%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Giao tiếp chuyên nghiệp</h3>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">45%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Kiến thức kỹ thuật</h3>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">80%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        href="/skills"
                                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                                    >
                                        Xem các khóa học được đề xuất
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
} 