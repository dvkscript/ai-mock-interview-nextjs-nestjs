"use client"
import Container from "@/components/common/Container";
import React, { useMemo, useState } from "react"
import { HistoryFilters } from "./_components/HistoryFilters";
import { HistoryPagination } from "./_components/HistoryPagination";
import { HistoryCard } from "./_components/HistoryCard";
import { deleteJob, GetJobAndCountAll } from "@/actions/job.action";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { JobStatus } from "@/lib/api/Types/job";
import { toast } from "sonner";

interface HistoryClientProps {
    jobs: GetJobAndCountAll["rows"];
    count: GetJobAndCountAll["count"];
    limit: number
}

const HistoryClient: React.FC<HistoryClientProps> = ({
    jobs,
    count,
    limit
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = useMemo(() => {
        const newSearchParams = new URLSearchParams(searchParams);

        const q = newSearchParams.get("q") || "";
        const experience = newSearchParams.get("experience") || "all";
        const score = newSearchParams.get("score") || "all";

        return {
            q,
            experience,
            score
        }
    }, [searchParams])

    const [searchQuery, setSearchQuery] = useState(query.q)
    const [experienceFilter, setExperienceFilter] = useState(query.experience)
    const [scoreFilter, setScoreFilter] = useState(query.score)

    const currentPage = useMemo(() => {
        const page = +(searchParams.get("page") || "1");
        const totalPages = Math.max(1, Math.ceil(count / limit));
        return Math.min(page, totalPages);
    }, [searchParams, count, limit]);

    const totalPages = useMemo(() => Math.ceil(count / limit), [count, limit]);

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Đang xóa...");
        const res = await deleteJob(id);
        
        toast.dismiss(toastId);
        if (!res.ok) {
            toast.error(res.message);
            return;
        }
        toast.success("Xóa thành công");
        router.refresh();
    }

    const handlePageChange = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", page.toString());

        const search = newSearchParams.toString();
        router.replace(`${pathname}?${search}`)
    }

    const handleSubmitFilter = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("q", searchQuery);
        newSearchParams.set("experience", experienceFilter);
        newSearchParams.set("score", scoreFilter);

        const search = newSearchParams.toString();
        router.replace(`${pathname}?${search}`);
    }

    return (
        <div className="pt-10 pb-20 bg-gradient-to-b from-background to-background/80">
            <Container className="mx-auto max-w-7xl">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            Lịch sử phỏng vấn
                        </h1>
                        <p className="text-lg text-muted-foreground/80">
                            Xem lại các buổi phỏng vấn và phản hồi
                        </p>
                    </div>

                    <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
                        <HistoryFilters
                            onSearch={setSearchQuery}
                            onExperienceFilter={setExperienceFilter}
                            onScoreFilter={setScoreFilter}
                            values={{
                                search: searchQuery,
                                experienceFilter,
                                scoreFilter
                            }}
                            onSubmit={handleSubmitFilter}
                        />
                    </div>

                    <div className="grid gap-6">
                        {jobs.length === 0 ? (<>
                            <div className="text-2xl p-3 font-medium text-zinc-600 text-center">
                                Không có dữ liệu
                            </div>
                        </>) : jobs.map((item) => (
                            <HistoryCard
                                key={item.id}
                                {...item}
                                onDelete={handleDelete}
                                onRedirect={() => {
                                    if (JobStatus.COMPLETED === item.status && item.feedback) {
                                        router.push(`/interview/${item.feedback.id}/feedback`)
                                    } else {
                                        router.push(`/interview/${item.id}/room`)
                                    }
                                }}
                            />
                        ))}
                    </div>
                    {
                        jobs.length > 0 && (
                            <HistoryPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )
                    }
                </div>
            </Container>
        </div>
    )
};

export default HistoryClient;