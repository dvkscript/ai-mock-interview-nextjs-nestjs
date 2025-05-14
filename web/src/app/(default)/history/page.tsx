"use client"
import { useState } from "react"
import { HistoryCard } from "./_components/HistoryCard"
import { HistoryFilters } from "./_components/HistoryFilters"
import { HistoryPagination } from "./_components/HistoryPagination"
import Container from "@/components/common/Container"
import { toast } from "sonner"

const mockHistory = [
    {
        id: "1",
        position: "Frontend Developer",
        date: "2024-03-15",
        score: 85,
        feedback: "Kỹ năng React tốt, cần cải thiện về TypeScript và testing.",
        status: "completed" as const,
    },
    {
        id: "2",
        position: "Backend Developer",
        date: "2024-03-14",
        score: 92,
        feedback: "Kiến thức về Node.js và database rất tốt.",
        status: "completed" as const,
    },
    {
        id: "3",
        position: "Full Stack Developer",
        date: "2024-03-13",
        score: 78,
        feedback: "Cân bằng tốt giữa frontend và backend, cần cải thiện về DevOps.",
        status: "completed" as const,
    },
    {
        id: "4",
        position: "DevOps Engineer",
        date: "2024-03-12",
        score: 88,
        feedback: "Kiến thức về CI/CD và containerization rất tốt.",
        status: "completed" as const,
    },
    {
        id: "5",
        position: "UI/UX Designer",
        date: "2024-03-11",
        score: 95,
        feedback: "Thiết kế sáng tạo và chuyên nghiệp.",
        status: "completed" as const,
    },
]

const ITEMS_PER_PAGE = 3

export default function HistoryPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [timeFilter, setTimeFilter] = useState("all")
    const [scoreFilter, setScoreFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [history, setHistory] = useState(mockHistory)

    const handleDelete = async (id: string) => {
        try {
            // TODO: Gọi API xóa
            await new Promise(resolve => setTimeout(resolve, 1000)) // Giả lập API call
            setHistory(prev => prev.filter(item => item.id !== id))
            toast.success("Đã xóa lịch sử phỏng vấn")
        } catch (error) {
            toast.error("Không thể xóa lịch sử phỏng vấn")
        }
    }

    const filteredHistory = history.filter((item) => {
        const matchesSearch = item.position
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        const matchesTime = timeFilter === "all" || true // Implement time filtering logic
        const matchesScore = scoreFilter === "all" || true // Implement score filtering logic
        return matchesSearch && matchesTime && matchesScore
    })

    const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedHistory = filteredHistory.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    )

    return (
        <div className="pt-10 pb-20 bg-gradient-to-b from-background to-background/80">
            <Container className="mx-auto">
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
                            onTimeFilter={setTimeFilter}
                            onScoreFilter={setScoreFilter}
                        />
                    </div>

                    <div className="grid gap-6">
                        {paginatedHistory.map((item) => (
                            <HistoryCard
                                key={item.id}
                                {...item}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    <HistoryPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </Container>
        </div>
    )
} 