"use client"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, Users, MessageSquare, FileText, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useUserStore } from "@/stores/userStore";
import { UserStatistics } from "./_components/UserStatistics";

const stats = [
    {
        title: 'Tổng người dùng',
        value: '1,234',
        change: '+12.3%',
        trend: 'up',
        icon: Users,
    },
    {
        title: 'Buổi phỏng vấn',
        value: '456',
        change: '+8.2%',
        trend: 'up',
        icon: FileText,
    },
    {
        title: 'Phản hồi',
        value: '789',
        change: '-2.1%',
        trend: 'down',
        icon: MessageSquare,
    },
    {
        title: 'Doanh thu',
        value: '12.5M',
        change: '+15.3%',
        trend: 'up',
        icon: TrendingUp,
    },
];

const recentActivities = [
    {
        user: 'Nguyễn Văn A',
        action: 'đã hoàn thành buổi phỏng vấn',
        time: '5 phút trước',
    },
    {
        user: 'Trần Thị B',
        action: 'đã đăng ký gói Pro',
        time: '10 phút trước',
    },
    {
        user: 'Lê Văn C',
        action: 'đã gửi phản hồi',
        time: '15 phút trước',
    },
    {
        user: 'Phạm Thị D',
        action: 'đã hoàn thành buổi phỏng vấn',
        time: '20 phút trước',
    },
];

interface AdminDashboardClientProps { 
    children?: React.ReactNode;
}

const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({ }) => {
    const profile = useUserStore(state => state.profile);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Tổng quan</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Chào mừng trở lại, {profile?.fullName}!
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        type="search"
                        placeholder="Tìm kiếm..."
                        className="w-[200px]"
                    />
                    <Button>Tạo báo cáo</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        {stat.title}
                                    </p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                    <div className="flex items-center mt-2">
                                        {stat.trend === 'up' ? (
                                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                                        )}
                                        <span
                                            className={`text-sm ${stat.trend === 'up'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                }`}
                                        >
                                            {stat.change}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Charts */}
                <UserStatistics />

                {/* Recent Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Hoạt động gần đây</CardTitle>
                        <CardDescription>
                            Các hoạt động mới nhất trong hệ thống
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{activity.user}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {activity.action}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="users">Người dùng</TabsTrigger>
                    <TabsTrigger value="interviews">Phỏng vấn</TabsTrigger>
                    <TabsTrigger value="feedback">Phản hồi</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng quan hệ thống</CardTitle>
                            <CardDescription>
                                Thông tin tổng quan về hệ thống
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center">
                                <BarChart3 className="h-8 w-8 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400 ml-2">
                                    Biểu đồ tổng quan sẽ được hiển thị ở đây
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thống kê người dùng</CardTitle>
                            <CardDescription>
                                Chi tiết về người dùng trong hệ thống
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center">
                                <Users className="h-8 w-8 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400 ml-2">
                                    Bảng thống kê người dùng sẽ được hiển thị ở đây
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="interviews" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thống kê phỏng vấn</CardTitle>
                            <CardDescription>
                                Chi tiết về các buổi phỏng vấn
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center">
                                <FileText className="h-8 w-8 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400 ml-2">
                                    Bảng thống kê phỏng vấn sẽ được hiển thị ở đây
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thống kê phản hồi</CardTitle>
                            <CardDescription>
                                Chi tiết về các phản hồi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center">
                                <MessageSquare className="h-8 w-8 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400 ml-2">
                                    Bảng thống kê phản hồi sẽ được hiển thị ở đây
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboardClient;