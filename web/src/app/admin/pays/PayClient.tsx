"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Download, Filter } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GetAdminPays } from "@/actions/admin.action"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCallback, useEffect, useState } from "react"
import dayjs from "@/lib/utils/dayjs"
import { cn } from "@/lib/utils"
import { PaginationWithLinks } from "@/components/ui/pagination-with-links"
import { useRouter, useSearchParams } from "next/navigation"
import useDebounce from "@/hooks/useDebounce"

interface PayClientProps {
    data: GetAdminPays;
    limit: string;
}

const columns = [
    { id: "userName", label: "Người dùng" },
    { id: "amount", label: "Số tiền" },
    { id: "paymentMethodTypes", label: "Phương thức" },
    { id: "description", label: "Gói dịch vụ" },
    { id: "status", label: "Trạng thái" },
    { id: "createdAt", label: "Ngày giao dịch" },
    { id: "action", label: "" },
]

const PayClient: React.FC<PayClientProps> = ({
    data,
    limit
}) => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const searchDebounce = useDebounce(search, 400);
    const router = useRouter();
    // const [selectDelete, setSelectDelete] = useState<GetAdminPays["rows"][number] | null>(null);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(limit);

    const getTimeDisplay = useCallback((date: Date) => {
        const now = dayjs();
        const created = dayjs(date);
        const diff = now.diff(created, 'day');

        if (diff < 30) {
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
                    <h1 className="text-3xl font-bold">Quản lý thanh toán</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Quản lý các giao dịch thanh toán trong hệ thống
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Lọc theo ngày
                    </Button>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Xuất báo cáo
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Danh sách giao dịch</CardTitle>
                    <CardDescription>
                        Tổng số giao dịch: {data.count}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Tìm kiếm giao dịch..."
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
                                        return <TableHead key={c.id} className={cn(c.id === "action" && "w-[50px]")}>{c.label}</TableHead>
                                    })}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.rows.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>
                                            <div className="flex gap-2 items-center">
                                                <Avatar>
                                                    <AvatarImage src={payment.thumbnail} alt={payment.userName} />
                                                    <AvatarFallback>
                                                        {payment.userName.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>
                                                    {payment.userName}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{payment.amount.toLocaleString('vi-VN')} VNĐ</TableCell>
                                        <TableCell>{payment.paymentMethodTypes.join(', ')}</TableCell>
                                        <TableCell>{payment.description}</TableCell>
                                        <TableCell>
                                            <Badge variant={"outline"}>
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{getTimeDisplay(payment.createdAt)}</TableCell>
                                        <TableCell className="flex justify-end items-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        Xem chi tiết
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Gửi hóa đơn
                                                    </DropdownMenuItem>
                                                    {payment.status === "processing" && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                Đánh dấu hoàn thành
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">
                                                                Đánh dấu thất bại
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
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
        </div>
    )
};

export default PayClient;