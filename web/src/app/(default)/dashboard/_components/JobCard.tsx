"use client"
import { GetJobAndCountAll, reGenerateQuestion } from "@/actions/job.action";
import { Badge } from "@/components/ui/badge";
import { JobStatus } from "@/lib/api/Types/job";
import { StatusBadgeColor, StatusText, getScoreColor } from "@/lib/utils";
import Link from "next/link";
import React, { useTransition } from "react"
import { Play } from "lucide-react";
import dayjs from "@/lib/utils/dayjs"
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import { toast } from "sonner";

interface JobCardProps {
    job: GetJobAndCountAll["rows"][number]
}

const JobCard: React.FC<JobCardProps> = ({
    job
}) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const getTimeDisplay = () => {
        const now = dayjs();
        const created = dayjs(job.createdAt);
        const diff = now.diff(created, 'day');

        if (diff < 1) {
            return created.fromNow();
        }
        return created.format('DD/MM/YYYY - HH:mm');
    };

    const renderActionButtons = () => {
        if (job.status === JobStatus.COMPLETED) {
            return (
                <>
                    {job.feedback && (
                        <Link
                            href={`/interview/${job.feedback.id}/feedback`}
                            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Feedback
                        </Link>
                    )}
                    <Link
                        href={`/interview/${job.id}/room`}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-colors shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Bắt đầu lại
                    </Link>
                </>
            );
        }

        if (job.status === JobStatus.IN_PROGRESS) {
            return (
                <>
                    <Link
                        href={`/interview/${job.id}/room`}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm"
                    >
                        <Play size={16} className="mr-1.5" />
                        Tiếp tục
                    </Link>
                    <Link
                        href={`/interview/${job.id}/room`}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Bắt đầu lại
                    </Link>
                </>
            );
        }

        if (job.status === JobStatus.CREATING) {
            return <>
                <Link
                    href={`/interview/${job.id}/startup`}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg bg-yellow-200 transition-colors shadow-sm"
                >
                    Đang tạo...
                </Link>
            </>
        }

        if (job.status === JobStatus.CREATE_FAILED) {
            return <>
                <Button
                    variant={"secondary"}
                    className="w-full"
                    onClick={() => {
                        startTransition(async () => {
                            const res = await reGenerateQuestion(job.id);
                            if (!res.ok) {
                                toast.error(res.message);
                            } else {
                                router.push(`/interview/${job.id}/startup`)
                            }
                        })
                    }}
                    disabled={isPending}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 mr-1.5 ${isPending ? "animate-spin" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {isPending ? "Đang tạo..." : "Tạo lại"}
                </Button>
            </>
        }

        return (
            <Link
                href={`/interview/${job.id}/room`}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bắt đầu
            </Link>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 relative">
            <div className="px-6 py-5">
                <div className="flex justify-between items-center">
                    <Badge
                        variant="outline"
                        className={`bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-2`}
                    >
                        {job.yearsOfExperience} năm kinh nghiệm
                    </Badge>
                    <Badge
                        variant="outline"
                        className={`${StatusBadgeColor[job.status]} mb-2`}
                    >
                        {StatusText[job.status]}
                    </Badge>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {job.position}
                </h3>
                <h4 className="line-clamp-2 mb-2 opacity-80">
                    {job.description}
                </h4>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getTimeDisplay()}
                    </p>
                    {job.status === JobStatus.COMPLETED && job.averageScore && (
                        <p className={`text-sm font-medium ${getScoreColor(job.averageScore)}`}>
                            Điểm: {job.averageScore}
                        </p>
                    )}
                </div>
                <div className="flex gap-3">
                    {renderActionButtons()}
                </div>
            </div>
        </div>
    );
};

export default JobCard;