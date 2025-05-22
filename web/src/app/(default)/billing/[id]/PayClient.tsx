"use client"

import React from "react";
import Container from '@/components/common/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Calendar, Zap, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { PayUserPro } from "@/actions/pay.action";
import dayjs from "@/lib/utils/dayjs"

interface PayClientProps {
    pay: PayUserPro;
}

export default function PayClient({ pay }: PayClientProps) {
    const planName = "Pro";
    const period = pay.description || "monthly";
    const unit = period === "yearly" ? "year" : "day";

    const nextSteps = [
        {
            icon: <Calendar className="w-6 h-6 text-purple-500" />,
            title: "Lên lịch phỏng vấn",
            description: "Tạo buổi phỏng vấn đầu tiên của bạn và bắt đầu luyện tập"
        },
        {
            icon: <Zap className="w-6 h-6 text-blue-500" />,
            title: "Khám phá tính năng",
            description: "Tìm hiểu các tính năng mới và tối ưu hóa trải nghiệm của bạn"
        },
        {
            icon: <HelpCircle className="w-6 h-6 text-green-500" />,
            title: "Cần hỗ trợ?",
            description: "Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <Container className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Success Message */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Thanh toán thành công!
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Cảm ơn bạn đã nâng cấp lên gói {planName} {period === "yearly" ? "năm" : "tháng"}
                    </p>
                </div>

                {/* Order Details */}
                <Card className="mb-12">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Chi tiết đơn hàng
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-gray-600 dark:text-gray-300">Gói dịch vụ</span>
                                <span className="font-medium text-gray-900 dark:text-white">{planName}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-gray-600 dark:text-gray-300">Kỳ hạn</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {period === "yearly" ? "1 năm" : "1 tháng"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-gray-600 dark:text-gray-300">Ngày bắt đầu</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {dayjs(pay.createdAt).format("HH:mm - DD/MM/YYYY")}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-gray-600 dark:text-gray-300">Ngày kết thúc</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {dayjs(pay.createdAt).add(period === "yearly" ? 1 : 30, unit).format("HH:mm - DD/MM/YYYY")}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-3 text-xl text-green-700">
                                <span className="text-gray-600 dark:text-gray-300 font-bold">Tiền đã thanh toán</span>
                                <span className="font-medium dark:text-white">
                                    {pay.amount.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Next Steps */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Bước tiếp theo
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {nextSteps.map((step, index) => (
                            <Card key={index} className="border-none shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        {step.icon}
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/dashboard">
                        <Button className="w-full sm:w-auto py-6 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                            Đến trang chủ
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/history">
                        <Button variant="outline" className="w-full sm:w-auto py-6 text-lg font-medium">
                            Tạo buổi phỏng vấn mới
                        </Button>
                    </Link>
                </div>

                {/* Support Note */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cần hỗ trợ? Liên hệ với chúng tôi tại{" "}
                        <a href="mailto:support@example.com" className="text-purple-600 hover:text-purple-700">
                            support@example.com
                        </a>
                    </p>
                </div>
            </Container>
        </div>
    );
} 