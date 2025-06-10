"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GetUserAndCountAll } from "@/actions/user.action"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCallback, useEffect, useState } from "react"
import dayjs from "@/lib/utils/dayjs"
import { useSearchParams } from "next/navigation"
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next-nprogress-bar"
import Link from "next/link"

interface UserClientProps {
  data: GetUserAndCountAll
}

const badgeColors = [
  "bg-red-500 text-white",
  "bg-orange-500 text-white",
  "bg-amber-500 text-black",
  "bg-yellow-400 text-black",
  "bg-lime-500 text-black",
  "bg-green-500 text-white",
  "bg-emerald-500 text-white",
  "bg-teal-500 text-white",
  "bg-cyan-500 text-black",
  "bg-sky-500 text-white",
  "bg-blue-500 text-white",
  "bg-indigo-500 text-white",
  "bg-violet-500 text-white",
  "bg-purple-500 text-white",
  "bg-fuchsia-500 text-white",
  "bg-pink-500 text-white",
  "bg-rose-500 text-white",
  "bg-gray-500 text-white",
  "bg-zinc-500 text-white",
  "bg-neutral-500 text-white",
  "bg-stone-500 text-white",
];

export default function UserClient({
  data
}: UserClientProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const searchDebounce = useDebounce(search, 400);
  const router = useRouter();

  const getTimeDisplay = useCallback((date: Date) => {
    const now = dayjs();
    const created = dayjs(date);
    const diff = now.diff(created, 'day');

    if (diff < 30) {
      return created.fromNow();
    }
    return created.format('HH:mm - DD/MM/YYYY');
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
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quản lý tài khoản người dùng trong hệ thống
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>
            Tổng số người dùng: {data.count}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm người dùng theo tên hoặc email..."
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
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Đăng nhập lần cuối</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rows.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center justify-start gap-2">
                        <Avatar className="rounded-md size-12">
                          <AvatarImage
                            alt={user.fullName}
                            src={user.thumbnail}
                            className="rounded-lg"
                          />
                          <AvatarFallback className="rounded-lg">
                            {
                              user.fullName.charAt(0).toUpperCase()
                            }
                          </AvatarFallback>
                        </Avatar>
                        <span>
                          {user.fullName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="flex-wrap flex gap-3 items-center justify-start h-full">
                      {user.roles.length === 0 ? <span className="text-sm text-gray-500">
                        Không có
                      </span> : user.roles.map((r, index) => {
                        return <Badge key={r.id} className={`${badgeColors[index % badgeColors.length]} px-2 max-w-96`}>
                          <span className="block w-full truncate">
                            {r.name}
                          </span>
                        </Badge>
                      })}
                    </TableCell>
                    <TableCell>
                      {
                        !user.provider ?
                          <>
                            <span className="text-sm text-gray-400 italic">Không có provider</span>
                          </>
                          :
                          <>
                            <div className="space-y-1">
                              <div className="font-medium capitalize">
                                {user.provider?.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {getTimeDisplay(user.provider.createdAt)}
                              </div>
                            </div>
                          </>
                      }
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}/edit`}>
                              Chỉnh sửa
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 