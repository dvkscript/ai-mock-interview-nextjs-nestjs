"use client"

import React, { useCallback, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from '@/components/common/Container';
import { Card, CardContent } from '@/components/ui/card';
import StripeProvider from "@/components/Pay/Stripe/StripeProvider";
import StripeCard from "@/components/Pay/Stripe/StripeCard";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import { payUserPro } from "@/actions/pay.action";
import { toast } from "sonner";

const plans = [
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    price: 199000,
    period: "tháng",
    features: [
      "Tạo không giới hạn buổi phỏng vấn",
      "Phân tích chi tiết kết quả",
      "Tùy chỉnh câu hỏi phỏng vấn",
      "Xuất báo cáo chi tiết",
      "Hỗ trợ qua email",
      "Truy cập tất cả template"
    ]
  },
  {
    id: "pro-yearly",
    name: "Pro Yearly",
    price: 1990000,
    period: "năm",
    features: [
      "Tất cả tính năng của Pro Monthly",
      "Tiết kiệm 2 tháng",
      "Ưu tiên hỗ trợ",
      "Tính năng mới sớm nhất",
      "Hỗ trợ 24/7",
      "Tùy chỉnh giao diện"
    ],
    popular: true
  }
];

export default function BillingPage() {
  const searchParams = useSearchParams();
  const period = searchParams.get("period") || "monthly";
  const submitBtnRef = useRef<HTMLInputElement | null>(null);
  const [isStripeLoaded, setIsStripeLoaded] = useState(false);
  const [
    errorMsg,
    setErrorMsg
  ] = useState<string>();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const filteredPlans = plans.filter(plan =>
    period === "yearly" ? plan.id === "pro-yearly" : plan.id === "pro-monthly"
  );

  const handleSubmit = useCallback(async ({ elements, stripe }: { stripe: Stripe, elements: StripeElements }) => {
    setLoading(true)
    const [{ error: submitError }, { error: methodError, paymentMethod }] = await Promise.all([
      elements.submit(),
      stripe.createPaymentMethod({
        elements
      })
    ]);

    if (submitError || methodError) {
      setErrorMsg(submitError?.message || methodError?.message);
      setLoading(false)
      return
    };

    const res = await payUserPro(period === "yearly" ? "yearly" : "monthly", paymentMethod.id);
    if (!res.ok || !res.data) {
      setLoading(false)
      return toast.error(res.message)
    } else {
      router.push(`/billing/${res.data.id}?period=${res.data.description}`)
    }
    setLoading(false)
  }, [period, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Chọn gói phù hợp với bạn
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Nâng cấp tài khoản của bạn để trải nghiệm đầy đủ tính năng và tối ưu hóa quá trình phỏng vấn
          </p>
        </div>

        {/* Period Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl border border-gray-200 p-1 bg-white shadow-sm">
            <button
              onClick={() => {
                router.push("/billing?period=monthly")
              }}
              className={`px-6 py-3 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200 ${period === "monthly"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Thanh toán hàng tháng
            </button>
            <button
              onClick={() => {
                router.push("/billing?period=yearly");
              }}
              className={`px-6 py-3 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200 relative ${period === "yearly"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Thanh toán hàng năm
              <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full absolute text-nowrap left-2/3 -translate-x-1/2 bottom-5/6">
                Tiết kiệm 20%
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Payment Form */}
          <Card className="max-w-4xl py-0 w-full mx-auto mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Thông tin thanh toán
              </h2>
              <div className="flex flex-col justify-between">
                <div className="flex-1 min-h-[280px]">
                  <StripeProvider>
                    <StripeCard
                      onSubmit={handleSubmit}
                      errorMsg={errorMsg}
                      onLoaded={(isLoaded) => {
                        setIsStripeLoaded(isLoaded);
                      }}
                    >
                      <input type="submit" hidden style={{ display: "none", opacity: 0, visibility: "hidden" }} ref={submitBtnRef} />
                    </StripeCard>
                  </StripeProvider>
                </div>
                {
                  isStripeLoaded && (
                    <Button
                      onClick={() => {
                        submitBtnRef.current?.click();
                      }}
                      type="button"
                      disabled={isLoading}
                      className="relative w-full mt-5 py-6 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      {
                        isLoading ? "Đang thanh toán..." : "Thanh toán ngay"
                      }
                    </Button>
                  )
                }
              </div>
            </CardContent>
          </Card>
          {/* Pricing Plans */}
          <div className="w-3xl mx-auto mb-16">
            {filteredPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative py-1 overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${plan.popular
                  ? "border-purple-500 shadow-lg"
                  : "border-gray-200 hover:border-purple-300"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-sm font-medium rounded-bl-lg">
                    Phổ biến nhất
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {plan.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        {`${plan.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}`}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-lg">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bạn có thể hủy gói bất kỳ lúc nào. Hoàn tiền trong 14 ngày nếu không hài lòng.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Cần hỗ trợ? Liên hệ với chúng tôi tại <a href="mailto:support@example.com" className="text-purple-600 hover:text-purple-700">support@example.com</a>
          </p>
        </div>
      </Container >
    </div >
  );
} 