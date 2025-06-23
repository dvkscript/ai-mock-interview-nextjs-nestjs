"use client"
import React, { useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, MessageSquare, FileText, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useUserStore } from "@/stores/userStore";
import { UserStatistics } from "./_components/UserStatistics";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "@/lib/utils/dayjs";
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell, Legend, Bar, BarChart, LineChart, Line, ResponsiveContainer } from 'recharts';
import { GetAdminAnalysis } from "@/actions/admin.action";

interface AdminDashboardClientProps {
    data: GetAdminAnalysis;
}

export default function AdminDashboardClient({ data }: AdminDashboardClientProps) {
    const { profile } = useUserStore();

    const formatTime = useCallback((time: Date) => {
        return dayjs(time).fromNow();
    }, []);

    const { userCount, jobCount, feedbackCount, payTotalAmount, users } = data;
    
    const countString = (count: number) => {
        return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const stats = useMemo(() => {
        return [
            {
                title: 'Tổng người dùng',
                value: countString(userCount),
                change: '+12.3%',
                trend: 'up',
                icon: Users,
            },
            {
                title: 'Buổi phỏng vấn',
                value: countString(jobCount),
                change: '+8.2%',
                trend: 'up',
                icon: FileText,
            },
            {
                title: 'Đánh giá',
                value: countString(feedbackCount),
                change: '-2.1%',
                trend: 'down',
                icon: MessageSquare,
            },
            {
                title: 'Doanh thu',
                value: payTotalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                change: '+15.3%',
                trend: 'up',
                icon: TrendingUp,
            },
        ]
    }, [userCount, jobCount, feedbackCount, payTotalAmount]);

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
                            {users.map((user, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                            <Avatar>
                                                <AvatarImage src={user.thumbnail} alt={user.fullName} />
                                                <AvatarFallback>
                                                    {user.fullName.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div>
                                            <p className="font-medium">{user.fullName}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Đã đăng nhập bằng {user.provider.name}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatTime(user.provider.createdAt)}
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Tổng quan hoạt động</CardTitle>
                                <CardDescription>
                                    Số lượng phỏng vấn và người dùng mới theo thời gian
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={[
                                                { date: '01/06', interviews: 45, newUsers: 28 },
                                                { date: '02/06', interviews: 52, newUsers: 32 },
                                                { date: '03/06', interviews: 48, newUsers: 25 },
                                                { date: '04/06', interviews: 65, newUsers: 40 },
                                                { date: '05/06', interviews: 58, newUsers: 35 },
                                                { date: '06/06', interviews: 72, newUsers: 45 },
                                                { date: '07/06', interviews: 69, newUsers: 38 },
                                            ]}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="interviews" name="Phỏng vấn" stroke="#8884d8" strokeWidth={2} />
                                            <Line type="monotone" dataKey="newUsers" name="Người dùng mới" stroke="#82ca9d" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Phân bố phỏng vấn</CardTitle>
                                <CardDescription>
                                    Theo vị trí công việc
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Frontend Developer', value: 35 },
                                                    { name: 'Backend Developer', value: 30 },
                                                    { name: 'Fullstack Developer', value: 20 },
                                                    { name: 'DevOps Engineer', value: 15 },
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {[
                                                    '#8884d8',
                                                    '#82ca9d',
                                                    '#ffc658',
                                                    '#ff8042',
                                                ].map((color, index) => (
                                                    <Cell key={`cell-${index}`} fill={color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tỷ lệ thành công</CardTitle>
                                <CardDescription>
                                    Kết quả phỏng vấn theo tuần
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                { week: 'Tuần 1', pass: 65, fail: 35 },
                                                { week: 'Tuần 2', pass: 72, fail: 28 },
                                                { week: 'Tuần 3', pass: 68, fail: 32 },
                                                { week: 'Tuần 4', pass: 75, fail: 25 },
                                            ]}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="week" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="pass" name="Đạt" stackId="a" fill="#82ca9d" />
                                            <Bar dataKey="fail" name="Không đạt" stackId="a" fill="#ff8042" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Tăng trưởng người dùng</CardTitle>
                                <CardDescription>
                                    Số lượng người dùng theo thời gian
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={[
                                                { month: 'T1', free: 1200, pro: 450 },
                                                { month: 'T2', free: 1350, pro: 520 },
                                                { month: 'T3', free: 1500, pro: 580 },
                                                { month: 'T4', free: 1800, pro: 620 },
                                                { month: 'T5', free: 2100, pro: 680 },
                                                { month: 'T6', free: 2400, pro: 750 },
                                            ]}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorFree" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                                </linearGradient>
                                                <linearGradient id="colorPro" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="free" name="Tài khoản Free" stroke="#8884d8" fillOpacity={1} fill="url(#colorFree)" />
                                            <Area type="monotone" dataKey="pro" name="Tài khoản Pro" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPro)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Hoạt động người dùng</CardTitle>
                                <CardDescription>
                                    Thống kê theo thời gian trong ngày
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={[
                                                { time: '00:00', active: 120 },
                                                { time: '04:00', active: 80 },
                                                { time: '08:00', active: 250 },
                                                { time: '12:00', active: 380 },
                                                { time: '16:00', active: 420 },
                                                { time: '20:00', active: 280 },
                                            ]}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="active" name="Người dùng hoạt động" stroke="#8884d8" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Phân bố thiết bị</CardTitle>
                                <CardDescription>
                                    Theo loại thiết bị truy cập
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Desktop', value: 55 },
                                                    { name: 'Mobile', value: 35 },
                                                    { name: 'Tablet', value: 10 },
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {[
                                                    '#8884d8',
                                                    '#82ca9d',
                                                    '#ffc658',
                                                ].map((color, index) => (
                                                    <Cell key={`cell-${index}`} fill={color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="interviews" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Thống kê phỏng vấn</CardTitle>
                                <CardDescription>
                                    Số lượng phỏng vấn theo kỹ năng và thời gian
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                { skill: 'JavaScript', junior: 45, mid: 30, senior: 15 },
                                                { skill: 'Python', junior: 35, mid: 25, senior: 20 },
                                                { skill: 'Java', junior: 30, mid: 35, senior: 25 },
                                                { skill: 'C++', junior: 25, mid: 20, senior: 15 },
                                                { skill: 'Go', junior: 20, mid: 15, senior: 10 },
                                            ]}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="skill" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="junior" name="Junior" fill="#8884d8" />
                                            <Bar dataKey="mid" name="Middle" fill="#82ca9d" />
                                            <Bar dataKey="senior" name="Senior" fill="#ffc658" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Thời lượng phỏng vấn</CardTitle>
                                <CardDescription>
                                    Phân bố theo thời gian
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: '15-30 phút', value: 30 },
                                                    { name: '30-45 phút', value: 45 },
                                                    { name: '45-60 phút', value: 20 },
                                                    { name: '60+ phút', value: 5 },
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {[
                                                    '#8884d8',
                                                    '#82ca9d',
                                                    '#ffc658',
                                                    '#ff8042',
                                                ].map((color, index) => (
                                                    <Cell key={`cell-${index}`} fill={color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tỷ lệ hoàn thành</CardTitle>
                                <CardDescription>
                                    Trạng thái phỏng vấn
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Hoàn thành', value: 75 },
                                                    { name: 'Hủy bỏ', value: 15 },
                                                    { name: 'Lỗi kỹ thuật', value: 10 },
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {[
                                                    '#82ca9d',
                                                    '#ff8042',
                                                    '#ffc658',
                                                ].map((color, index) => (
                                                    <Cell key={`cell-${index}`} fill={color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="feedback" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Đánh giá theo thời gian</CardTitle>
                                <CardDescription>
                                    Điểm đánh giá trung bình theo ngày
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={[
                                                { date: '01/06', rating: 4.5, responses: 25 },
                                                { date: '02/06', rating: 4.3, responses: 30 },
                                                { date: '03/06', rating: 4.7, responses: 28 },
                                                { date: '04/06', rating: 4.4, responses: 35 },
                                                { date: '05/06', rating: 4.6, responses: 32 },
                                                { date: '06/06', rating: 4.8, responses: 40 },
                                                { date: '07/06', rating: 4.5, responses: 38 },
                                            ]}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis yAxisId="left" />
                                            <YAxis yAxisId="right" orientation="right" />
                                            <Tooltip />
                                            <Legend />
                                            <Line yAxisId="left" type="monotone" dataKey="rating" name="Điểm đánh giá" stroke="#8884d8" strokeWidth={2} />
                                            <Line yAxisId="right" type="monotone" dataKey="responses" name="Số lượng đánh giá" stroke="#82ca9d" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Phân bố đánh giá</CardTitle>
                                <CardDescription>
                                    Theo số sao đánh giá
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                { star: '5 sao', count: 450 },
                                                { star: '4 sao', count: 320 },
                                                { star: '3 sao', count: 150 },
                                                { star: '2 sao', count: 50 },
                                                { star: '1 sao', count: 30 },
                                            ]}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="star" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="count" name="Số lượng" fill="#ffc658" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Chủ đề phản hồi</CardTitle>
                                <CardDescription>
                                    Các chủ đề được đề cập nhiều
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Chất lượng câu hỏi', value: 40 },
                                                    { name: 'Giao diện', value: 25 },
                                                    { name: 'Độ chính xác', value: 20 },
                                                    { name: 'Tốc độ', value: 15 },
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {[
                                                    '#8884d8',
                                                    '#82ca9d',
                                                    '#ffc658',
                                                    '#ff8042',
                                                ].map((color, index) => (
                                                    <Cell key={`cell-${index}`} fill={color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
