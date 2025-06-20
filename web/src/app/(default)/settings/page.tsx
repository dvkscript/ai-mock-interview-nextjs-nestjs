"use client"
import Container from '@/components/common/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Lock, Sun, User } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';
import { ProfileAvatar } from './_components/ProfileAvatar';
import { ProfileForm } from './_components/ProfileForm';

export default function SettingsPage() {
  const { profile } = useUserStore();

  return (
    <div className="py-6 sm:px-6 lg:px-8 pt-20 md:pt-6">
      <Container className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Cài đặt
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tùy chỉnh tài khoản và cài đặt ứng dụng
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList>
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2" />
              Tài khoản
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Thông báo
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Sun className="h-4 w-4 mr-2" />
              Giao diện
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Lock className="h-4 w-4 mr-2" />
              Bảo mật
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Tài khoản</CardTitle>
                <CardDescription>
                  Cập nhật thông tin tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className='flex gap-10'>
                  <div className="flex flex-col items-center px-20">
                    <ProfileAvatar />
                    <h2 className="text-xl font-semibold mt-4">
                      {profile?.fullName}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {profile?.email}
                    </p>
                  </div>
                  <ProfileForm profile={profile} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Thông báo</CardTitle>
                <CardDescription>
                  Cấu hình cài đặt thông báo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo email</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Nhận thông báo qua email
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo ứng dụng</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Nhận thông báo trong ứng dụng
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo kết quả</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Nhận thông báo khi có kết quả phỏng vấn
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Giao diện</CardTitle>
                <CardDescription>
                  Tùy chỉnh giao diện ứng dụng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Chế độ tối</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Chuyển đổi giữa chế độ sáng và tối
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Cỡ chữ</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cỡ chữ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Nhỏ</SelectItem>
                        <SelectItem value="medium">Vừa</SelectItem>
                        <SelectItem value="large">Lớn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Bảo mật</CardTitle>
                <CardDescription>
                  Quản lý cài đặt bảo mật và quyền riêng tư
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Xác thực hai yếu tố</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Bảo vệ tài khoản của bạn bằng xác thực hai yếu tố
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Hiển thị trạng thái trực tuyến</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cho phép người khác thấy khi bạn đang trực tuyến
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Thời gian hết phiên</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thời gian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 phút</SelectItem>
                        <SelectItem value="30">30 phút</SelectItem>
                        <SelectItem value="60">1 giờ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="destructive">Xóa tài khoản</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
} 