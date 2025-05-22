import { getJobWithQuestion } from "@/actions/job.action";
import React from "react"
import RoomDetailClient from "./RoomDetailClient";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        id: string
    }>
}

const Page: React.FC<PageProps> = async ({
    params
}) => {
    const { id } = await params;

    const jobs = await getJobWithQuestion(id);

    if (!jobs.data) {
        throw new Error(jobs.status.toString())
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800 py-8">
            <div className="max-w-[2000px] flex flex-col mx-auto px-4 lg:px-10 h-full">
                <div className="flex justify-between items-center mb-8">
                    <Link 
                        href={"/dashboard"}
                    >
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            Mock Interview
                        </h1>
                    </Link>
                </div>
                <RoomDetailClient
                    jobs={jobs.data}
                />
            </div>
        </div>
    );
};

export default Page;