"use client"
import Container from '@/components/common/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Clock, Send } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="py-6 sm:px-6 lg:px-8 pt-20 md:pt-6">
      <Container className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Hỗ trợ trực tuyến
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
                <CardDescription>
                  Liên hệ với chúng tôi qua các kênh sau
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      support@example.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Điện thoại</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +84 123 456 789
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Thời gian làm việc</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      24/7
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Câu hỏi thường gặp</CardTitle>
                <CardDescription>
                  Tìm câu trả lời nhanh cho các vấn đề phổ biến
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Làm thế nào để bắt đầu?</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Đăng ký tài khoản và tạo buổi phỏng vấn đầu tiên của bạn.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Cách thanh toán?</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Chính sách hoàn tiền?</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hoàn tiền trong vòng 7 ngày nếu không hài lòng.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Gửi tin nhắn cho chúng tôi</CardTitle>
                <CardDescription>
                  Điền form bên dưới và chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input id="name" placeholder="Nhập họ và tên của bạn" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Nhập email của bạn" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Tiêu đề</Label>
                    <Input id="subject" placeholder="Nhập tiêu đề tin nhắn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung</Label>
                    <Textarea
                      id="message"
                      placeholder="Nhập nội dung tin nhắn của bạn"
                      className="min-h-[200px]"
                    />
                  </div>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Gửi tin nhắn
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
} 