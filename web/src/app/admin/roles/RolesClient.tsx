"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Plus, Shield } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { deleteRole, GetRoleAndCountAll } from "@/actions/role.action"
import dayjs from "@/lib/utils/dayjs"
import { useCallback, useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next-nprogress-bar"
import { useSearchParams } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { PaginationWithLinks } from "@/components/ui/pagination-with-links"

interface RolesClientProps {
    data: GetRoleAndCountAll
    limit: string
}

const columns = [
    { id: "name", label: "Tên vai trò" },
    { id: "userCount", label: "Số người dùng" },
    { id: "createdAt", label: "Thời gian tạo" },
    { id: "updatedAt", label: "Thời gian sửa" },
    { id: "action", label: "" },
]

const RolesClient: React.FC<RolesClientProps> = ({
    data,
    limit
}) => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const searchDebounce = useDebounce(search, 400);
    const router = useRouter();
    const [selectDelete, setSelectDelete] = useState<GetRoleAndCountAll["rows"][number] | null>(null);

    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(limit);


    const getTimeDisplay = useCallback((date: Date) => {
        const now = dayjs();
        const created = dayjs(date);
        const diff = now.diff(created, 'day');

        if (diff < 1) {
            return created.fromNow();
        }
        return created.format('DD/MM/YYYY - HH:mm');
    }, []);

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
                    <h1 className="text-3xl font-bold">Quản lý phân quyền</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Quản lý vai trò và quyền hạn trong hệ thống
                    </p>
                </div>
                <Link href="/admin/roles/add">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm vai trò
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Danh sách vai trò</CardTitle>
                    <CardDescription>
                        Tổng số vai trò: {data.count}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Tìm kiếm vai trò..."
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
                                    {columns.map((c) => {
                                        if (c.id === "action") {
                                            <TableHead className="w-[50px]"></TableHead>
                                        }
                                        return <TableHead key={c.id}>{c.label}</TableHead>
                                    })}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.rows.length === 0 ?
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="text-2xl text-center p-5">
                                                Không có dữ liệu
                                            </TableCell>
                                        </TableRow>
                                    </> : <>
                                        {data.rows.map((role) => (
                                            <TableRow key={role.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="h-4 w-4" />
                                                        <span className="font-medium">{role.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{role.userCount}</TableCell>
                                                <TableCell>
                                                    {getTimeDisplay(role.createdAt)}
                                                </TableCell>
                                                <TableCell>
                                                    {getTimeDisplay(role.updatedAt)}
                                                </TableCell>
                                                <TableCell className="flex justify-center items-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <Link href={`/admin/roles/${role.id}/edit`}>
                                                                <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                                                            </Link>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onClick={() => {
                                                                    setTimeout(() => {
                                                                        setSelectDelete(role);
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
                                    </>
                                }
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
                            Bạn có chắc chắn muốn xóa vai trò này không?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Hủy bỏ
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                if (!selectDelete) return
                                const toastId = toast.loading("Đang xóa vai trò...");
                                const res = await deleteRole([selectDelete.id]);

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

export default RolesClient;