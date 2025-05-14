"use client"
import Container from '@/components/common/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, CreditCard, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Cơ bản',
    price: '0',
    description: 'Dành cho người mới bắt đầu',
    features: [
      '5 buổi phỏng vấn mỗi tháng',
      'Phản hồi cơ bản',
      'Truy cập tài liệu cơ bản',
    ],
  },
  {
    name: 'Chuyên nghiệp',
    price: '299.000',
    description: 'Dành cho người đang tìm việc',
    features: [
      '20 buổi phỏng vấn mỗi tháng',
      'Phản hồi chi tiết',
      'Truy cập tất cả tài liệu',
      'Phân tích tiến trình',
      'Hỗ trợ ưu tiên',
    ],
    popular: true,
  },
  {
    name: 'Doanh nghiệp',
    price: 'Liên hệ',
    description: 'Dành cho công ty và tổ chức',
    features: [
      'Không giới hạn buổi phỏng vấn',
      'Phản hồi nâng cao',
      'API truy cập',
      'Tùy chỉnh câu hỏi',
      'Quản lý nhiều người dùng',
      'Hỗ trợ 24/7',
    ],
  },
];

export default function BillingPage() {
  return (
    <div className="py-6 sm:px-6 lg:px-8 pt-20 md:pt-6">
      <Container className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Thanh toán
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Chọn gói dịch vụ phù hợp với nhu cầu của bạn
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? 'border-blue-500 dark:border-blue-400 shadow-lg'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Phổ biến nhất
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-3xl font-bold">
                    {plan.price === '0' ? 'Miễn phí' : `${plan.price}đ`}
                  </span>
                  {plan.price !== '0' && plan.price !== 'Liên hệ' && (
                    <span className="text-gray-500 dark:text-gray-400">/tháng</span>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.price === 'Liên hệ' ? 'Liên hệ' : 'Chọn gói'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Thanh toán</CardTitle>
            <CardDescription>
              Điền thông tin thanh toán của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Họ</Label>
                    <Input id="firstName" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Tên</Label>
                    <Input id="lastName" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Số thẻ</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Ngày hết hạn</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Phương thức thanh toán</Label>
                <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Thẻ tín dụng
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="momo"
                      id="momo"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="momo"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Zap className="mb-3 h-6 w-6" />
                      MoMo
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="bank"
                      id="bank"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="bank"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Chuyển khoản
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full">Thanh toán</Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
} 