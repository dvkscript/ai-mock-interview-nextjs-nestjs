"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const feedbacks = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    content: "Trải nghiệm rất tốt, giao diện dễ sử dụng",
    rating: 5,
    status: "pending",
    date: "2024-03-20 10:30",
  },
  {
    id: 2,
    user: "Trần Thị B",
    content: "Cần cải thiện thêm về tốc độ phản hồi",
    rating: 4,
    status: "resolved",
    date: "2024-03-20 09:15",
  },
  {
    id: 3,
    user: "Lê Văn C",
    content: "Gặp lỗi khi tạo buổi phỏng vấn mới",
    rating: 3,
    status: "in_progress",
    date: "2024-03-19 15:45",
  },
]

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý phản hồi</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quản lý phản hồi từ người dùng
          </p>
        </div>
        <Button variant="outline">Xuất báo cáo</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách phản hồi</CardTitle>
          <CardDescription>
            Tổng số phản hồi: {feedbacks.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm phản hồi..."
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
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày gửi</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell>{feedback.id}</TableCell>
                    <TableCell>{feedback.user}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {feedback.content}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{feedback.rating}/5</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          feedback.status === "resolved"
                            ? "default"
                            : feedback.status === "in_progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {feedback.status === "resolved"
                          ? "Đã xử lý"
                          : feedback.status === "in_progress"
                          ? "Đang xử lý"
                          : "Chờ xử lý"}
                      </Badge>
                    </TableCell>
                    <TableCell>{feedback.date}</TableCell>
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
                          <DropdownMenuItem>Phản hồi</DropdownMenuItem>
                          <DropdownMenuItem>Đánh dấu đã xử lý</DropdownMenuItem>
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