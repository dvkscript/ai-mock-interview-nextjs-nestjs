"use client"
import Container from '@/components/common/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, FileText, BarChart, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function BillingSuccessPage() {
  return (
    <div className="py-6 sm:px-6 lg:px-8 pt-20 md:pt-6">
      <Container className="max-w-3xl mx-auto px-4 sm:px-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Thanh toán thành công!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Cảm ơn bạn đã đăng ký gói dịch vụ của chúng tôi
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Chi tiết đơn hàng</CardTitle>
            <CardDescription>
              Thông tin về gói dịch vụ bạn đã đăng ký
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Gói dịch vụ</span>
                <span className="font-medium">Chuyên nghiệp</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Thời hạn</span>
                <span className="font-medium">1 tháng</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Ngày bắt đầu</span>
                <span className="font-medium">20/03/2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Ngày kết thúc</span>
                <span className="font-medium">20/04/2024</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-medium">Tổng cộng</span>
                <span className="text-lg font-bold">299.000đ</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <FileText className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Bắt đầu phỏng vấn</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Tạo buổi phỏng vấn đầu tiên của bạn
                </p>
                <Button asChild>
                  <Link href="/dashboard">
                    Bắt đầu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <BarChart className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Xem phân tích</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Theo dõi tiến trình của bạn
                </p>
                <Button asChild variant="outline">
                  <Link href="/analytics">
                    Xem ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <HelpCircle className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="font-semibold mb-2">Cần hỗ trợ?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Liên hệ với chúng tôi để được hỗ trợ
                </p>
                <Button asChild variant="outline">
                  <Link href="/support">
                    Liên hệ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
} 