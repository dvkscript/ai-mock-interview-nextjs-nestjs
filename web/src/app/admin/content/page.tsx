"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Plus, FileText, Video, BookOpen } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const questions = [
  {
    id: 1,
    title: "Giới thiệu về bản thân",
    category: "Chung",
    difficulty: "Dễ",
    status: "published",
  },
  {
    id: 2,
    title: "Kinh nghiệm làm việc",
    category: "Kinh nghiệm",
    difficulty: "Trung bình",
    status: "draft",
  },
]

const videos = [
  {
    id: 1,
    title: "Hướng dẫn phỏng vấn Frontend",
    category: "Frontend",
    duration: "15:30",
    status: "published",
  },
  {
    id: 2,
    title: "Tips phỏng vấn Backend",
    category: "Backend",
    duration: "20:15",
    status: "draft",
  },
]

const articles = [
  {
    id: 1,
    title: "Cách chuẩn bị cho buổi phỏng vấn",
    category: "Hướng dẫn",
    views: 1234,
    status: "published",
  },
  {
    id: 2,
    title: "Các câu hỏi phỏng vấn phổ biến",
    category: "Tài liệu",
    views: 856,
    status: "draft",
  },
]

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý nội dung</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quản lý các nội dung trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm nội dung
        </Button>
      </div>

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">
            <FileText className="mr-2 h-4 w-4" />
            Câu hỏi
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Video
          </TabsTrigger>
          <TabsTrigger value="articles">
            <BookOpen className="mr-2 h-4 w-4" />
            Bài viết
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Câu hỏi phỏng vấn</CardTitle>
              <CardDescription>
                Quản lý các câu hỏi phỏng vấn trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Tìm kiếm câu hỏi..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline">Lọc</Button>
              </div>

              <div className="space-y-4">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{question.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{question.category}</span>
                        <span>•</span>
                        <span>{question.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={question.status === "published" ? "default" : "secondary"}
                      >
                        {question.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem>Xem trước</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Video hướng dẫn</CardTitle>
              <CardDescription>
                Quản lý các video hướng dẫn trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Tìm kiếm video..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline">Lọc</Button>
              </div>

              <div className="space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{video.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{video.category}</span>
                        <span>•</span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={video.status === "published" ? "default" : "secondary"}
                      >
                        {video.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem>Xem trước</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>Bài viết</CardTitle>
              <CardDescription>
                Quản lý các bài viết trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Tìm kiếm bài viết..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline">Lọc</Button>
              </div>

              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{article.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.views} lượt xem</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={article.status === "published" ? "default" : "secondary"}
                      >
                        {article.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem>Xem trước</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 