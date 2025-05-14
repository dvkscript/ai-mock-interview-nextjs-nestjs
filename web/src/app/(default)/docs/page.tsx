"use client"
import Container from '@/components/common/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, FileText, Video, HelpCircle, Search, ChevronRight } from 'lucide-react';

const mockDocs = [
  {
    category: 'Bắt đầu',
    items: [
      {
        title: 'Hướng dẫn đăng ký',
        description: 'Cách tạo tài khoản và thiết lập hồ sơ',
        icon: Book,
      },
      {
        title: 'Tạo buổi phỏng vấn đầu tiên',
        description: 'Hướng dẫn chi tiết cách tạo và tham gia phỏng vấn',
        icon: FileText,
      },
      {
        title: 'Video hướng dẫn',
        description: 'Xem video hướng dẫn sử dụng nền tảng',
        icon: Video,
      },
    ],
  },
  {
    category: 'Tính năng',
    items: [
      {
        title: 'Phỏng vấn AI',
        description: 'Tìm hiểu về hệ thống phỏng vấn thông minh',
        icon: HelpCircle,
      },
      {
        title: 'Phân tích kết quả',
        description: 'Cách đọc và hiểu báo cáo đánh giá',
        icon: FileText,
      },
      {
        title: 'Tùy chỉnh câu hỏi',
        description: 'Cách tùy chỉnh bộ câu hỏi phỏng vấn',
        icon: Book,
      },
    ],
  },
  {
    category: 'Nâng cao',
    items: [
      {
        title: 'API Documentation',
        description: 'Tài liệu kỹ thuật cho nhà phát triển',
        icon: FileText,
      },
      {
        title: 'Tích hợp hệ thống',
        description: 'Hướng dẫn tích hợp với hệ thống khác',
        icon: Book,
      },
      {
        title: 'Best Practices',
        description: 'Các phương pháp hay nhất khi sử dụng',
        icon: HelpCircle,
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="py-6 sm:px-6 lg:px-8 pt-20 md:pt-6">
      <Container className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Tài liệu hướng dẫn
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tìm hiểu cách sử dụng nền tảng một cách hiệu quả
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Tìm kiếm tài liệu..."
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-6">
          <TabsList>
            <TabsTrigger value="getting-started">Bắt đầu</TabsTrigger>
            <TabsTrigger value="features">Tính năng</TabsTrigger>
            <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
          </TabsList>

          {mockDocs.map((section) => (
            <TabsContent key={section.category} value={section.category.toLowerCase().replace(' ', '-')}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <Card key={item.title} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {item.description}
                          </p>
                          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                            Đọc thêm
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Links */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Liên kết nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center text-center">
                <Book className="h-6 w-6 mb-2" />
                <span className="font-medium">Hướng dẫn cơ bản</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center text-center">
                <Video className="h-6 w-6 mb-2" />
                <span className="font-medium">Video hướng dẫn</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center text-center">
                <HelpCircle className="h-6 w-6 mb-2" />
                <span className="font-medium">Câu hỏi thường gặp</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center text-center">
                <FileText className="h-6 w-6 mb-2" />
                <span className="font-medium">Tài liệu API</span>
              </div>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
} 