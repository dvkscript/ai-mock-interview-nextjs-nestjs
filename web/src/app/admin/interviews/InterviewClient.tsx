"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GetAdminJobs } from "@/actions/admin.action"
import { useRouter, useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getScoreColor, StatusBadgeColor, StatusText } from "@/lib/utils"
import { JobStatus } from "@/lib/api/Types/job"
import dayjs from "@/lib/utils/dayjs"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import { PaginationWithLinks } from "@/components/ui/pagination-with-links"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { deleteJob } from "@/actions/job.action"

interface InterviewClientProps {
    data: GetAdminJobs;
    limit: string
}

const columns = [
    { id: "index", label: "STT" },
    { id: "user", label: "Người dùng" },
    { id: "position", label: "Vị trí" },
    { id: "status", label: "Trạng thái" },
    { id: "score", label: "Điểm" },
    { id: "createdAt", label: "Ngày tạo" },
    { id: "action", label: "" },
]

const InterviewClient: React.FC<InterviewClientProps> = ({
    data,
    limit
}) => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const searchDebounce = useDebounce(search, 400);
    const router = useRouter();
    const [selectDelete, setSelectDelete] = useState<GetAdminJobs["rows"][number] | null>(null);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(limit);

    const getTimeDisplay = (date: Date) => {
        const now = dayjs();
        const created = dayjs(date);
        const diff = now.diff(created, 'day');

        if (diff < 30) {
            return created.fromNow();
        }

        return created.format('DD/MM/YYYY - HH:mm');
    };

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        const q = searchParams.get("q") || "";

        if (q === searchDebounce) return;
        newSearchParams.set('q', searchDebounce);
        router.replace(`?${newSearchParams.toString()}`);
    }, [searchDebounce, searchParams, router]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý phỏng vấn</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Quản lý các buổi phỏng vấn trong hệ thống
                    </p>
                </div>
                <Button variant="outline">Xuất báo cáo</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Danh sách phỏng vấn</CardTitle>
                    <CardDescription>
                        Tổng số buổi phỏng vấn: {data.count}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Tìm kiếm phỏng vấn theo vị trí hoặc mô tả"
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.currentTarget.value || "")}
                            />
                        </div>
                        <Button variant="outline">Lọc</Button>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableHead key={column.id} className={column.id === "action" ? "w-[50px]" : ""}>{column.label}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.rows.map((interview, index) => (
                                    <TableRow key={interview.id}>
                                        <TableCell>{
                                            +limit * (+page - 1) + index + 1
                                        }</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="size-10">
                                                    <AvatarImage src={interview.thumbnail} />
                                                    <AvatarFallback
                                                    >
                                                        {interview.userName.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>
                                                    {interview.userName}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{interview.position}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`${StatusBadgeColor[interview.status]} mb-2`}
                                            >
                                                {StatusText[interview.status]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {interview.status === JobStatus.COMPLETED && interview.averageScore && (
                                                <p className={`text-sm font-medium ${getScoreColor(interview.averageScore)}`}>
                                                    {interview.averageScore}
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {getTimeDisplay(interview.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                                    {/* <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Video className="mr-2 h-4 w-4" />
                                                        Xem lại
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                                                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem> */}
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => {
                                                            setTimeout(() => {
                                                                setSelectDelete(interview);
                                                            }, 100);
                                                        }}
                                                    >
                                                        Xóa
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {
                                data.rows.length > 0 && (
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <PaginationWithLinks page={page} pageSize={pageSize} totalCount={data.count} />
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                )
                            }
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <AlertDialog open={!!selectDelete} onOpenChange={(open) => {
                if (!open) {
                    setSelectDelete(null)
                }
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Xóa vai trò
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Hủy bỏ
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                if (!selectDelete) return
                                const toastId = toast.loading("Đang xóa phiên phỏng vấn...");
                                const res = await deleteJob(selectDelete.id);

                                toast.dismiss(toastId);
                                if (!res.data) {
                                    toast.error(res.message)
                                } else {
                                    setSelectDelete(null)
                                }
                            }}
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
};

export default InterviewClient;