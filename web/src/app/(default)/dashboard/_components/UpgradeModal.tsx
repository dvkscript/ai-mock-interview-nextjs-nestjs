"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (planId: string) => void;
}

const plans = [
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    price: "199.000đ",
    period: "tháng",
    features: [
      "Tạo không giới hạn buổi phỏng vấn",
      "Phân tích chi tiết kết quả",
      "Tùy chỉnh câu hỏi phỏng vấn",
      "Xuất báo cáo chi tiết"
    ]
  },
  {
    id: "pro-yearly",
    name: "Pro Yearly",
    price: "1.990.000đ",
    period: "năm",
    features: [
      "Tất cả tính năng của Pro Monthly",
      "Tiết kiệm 2 tháng",
      "Ưu tiên hỗ trợ",
      "Tính năng mới sớm nhất"
    ],
    popular: true
  }
];

export function UpgradeModal({ isOpen, onClose, onUpgrade }: UpgradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Nâng cấp tài khoản của bạn
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:px-4">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:border-purple-500 ${
                plan.popular ? "border-purple-500" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Phổ biến nhất
                </div>
              )}
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onUpgrade(plan.id)}
                  className={`w-full py-6 text-lg ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  } text-white`}
                >
                  Chọn gói {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bạn có thể hủy gói bất kỳ lúc nào. Hoàn tiền trong 14 ngày nếu không hài lòng.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 