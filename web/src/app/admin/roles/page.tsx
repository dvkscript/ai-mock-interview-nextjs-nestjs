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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Quản trị viên hệ thống",
    users: 2,
    permissions: [
      "Quản lý người dùng",
      "Quản lý nội dung",
      "Quản lý phỏng vấn",
      "Quản lý phản hồi",
      "Quản lý cài đặt",
    ],
  },
  {
    id: 2,
    name: "Moderator",
    description: "Điều hành viên",
    users: 5,
    permissions: [
      "Quản lý nội dung",
      "Quản lý phỏng vấn",
      "Quản lý phản hồi",
    ],
  },
  {
    id: 3,
    name: "User",
    description: "Người dùng thông thường",
    users: 100,
    permissions: [
      "Xem nội dung",
      "Tạo phỏng vấn",
      "Gửi phản hồi",
    ],
  },
]

// const permissionIcons = {
//   "Quản lý người dùng": Users,
//   "Quản lý nội dung": FileText,
//   "Quản lý phỏng vấn": FileText,
//   "Quản lý phản hồi": MessageSquare,
//   "Quản lý cài đặt": Settings,
//   "Xem nội dung": FileText,
//   "Tạo phỏng vấn": FileText,
//   "Gửi phản hồi": MessageSquare,
// }

export default function RolesPage() {
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
            Tổng số vai trò: {roles.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm vai trò..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">Lọc</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Số người dùng</TableHead>
                  <TableHead>Quyền hạn</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.users}</TableCell>
                    <TableCell>
                      {/* <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission) => {
                          const Icon = permissionIcons[permission]
                          return (
                            <Badge key={permission} variant="secondary">
                              <Icon className="mr-1 h-3 w-3" />
                              {permission}
                            </Badge>
                          )
                        })}
                      </div> */}
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
                          <Link href={`/admin/roles/${role.id}/edit`}>
                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
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