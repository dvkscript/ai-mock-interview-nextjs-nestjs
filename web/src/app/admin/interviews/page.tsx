"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Video } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const interviews = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    position: "Frontend Developer",
    status: "completed",
    score: 85,
    duration: "45:00",
    date: "2024-03-20 10:30",
  },
  {
    id: 2,
    user: "Trần Thị B",
    position: "Backend Developer",
    status: "in_progress",
    score: null,
    duration: "30:15",
    date: "2024-03-20 09:15",
  },
  {
    id: 3,
    user: "Lê Văn C",
    position: "Fullstack Developer",
    status: "scheduled",
    score: null,
    duration: null,
    date: "2024-03-21 15:00",
  },
]

export default function InterviewsPage() {
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
            Tổng số buổi phỏng vấn: {interviews.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm phỏng vấn..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">Lọc</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Điểm</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>{interview.id}</TableCell>
                    <TableCell>{interview.user}</TableCell>
                    <TableCell>{interview.position}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          interview.status === "completed"
                            ? "default"
                            : interview.status === "in_progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {interview.status === "completed"
                          ? "Hoàn thành"
                          : interview.status === "in_progress"
                          ? "Đang diễn ra"
                          : "Đã lên lịch"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {interview.score ? `${interview.score}%` : "-"}
                    </TableCell>
                    <TableCell>
                      {interview.duration || "-"}
                    </TableCell>
                    <TableCell>{interview.date}</TableCell>
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
                          <DropdownMenuItem>
                            <Video className="mr-2 h-4 w-4" />
                            Xem lại
                          </DropdownMenuItem>
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
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