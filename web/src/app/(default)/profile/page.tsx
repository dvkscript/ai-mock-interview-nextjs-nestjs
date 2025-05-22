"use client"
import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Mail, Phone, MapPin } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';

export default function ProfilePage() {
  const profile = useUserStore(s => s.profile);

  return (
    <div className="py-6 sm:px-6 lg:px-8 pt-20 md:pt-6">
      <Container className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
            Hồ sơ cá nhân
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Quản lý thông tin cá nhân và tài khoản của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={profile?.thumbnail} alt="User avatar" />
                      <AvatarFallback>
                        {profile?.fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold mt-4">
                    {profile?.fullName}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4" />
                    <span>{profile?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4" />
                    <span>+84 123 456 789</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>Hà Nội, Việt Nam</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList>
                <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
                <TabsTrigger value="professional">Thông tin nghề nghiệp</TabsTrigger>
                <TabsTrigger value="security">Bảo mật</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>
                      Cập nhật thông tin cá nhân của bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Họ</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Tên</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" defaultValue="+84 123 456 789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Địa chỉ</Label>
                      <Input id="location" defaultValue="Hà Nội, Việt Nam" />
                    </div>
                    <Button>Lưu thay đổi</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="professional">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin nghề nghiệp</CardTitle>
                    <CardDescription>
                      Cập nhật thông tin về kinh nghiệm và kỹ năng của bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Vị trí hiện tại</Label>
                      <Input id="position" defaultValue="Full Stack Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Công ty</Label>
                      <Input id="company" defaultValue="Tech Company" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Kinh nghiệm</Label>
                      <Input id="experience" defaultValue="5 năm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Kỹ năng</Label>
                      <Input id="skills" defaultValue="React, Node.js, TypeScript" />
                    </div>
                    <Button>Lưu thay đổi</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Bảo mật</CardTitle>
                    <CardDescription>
                      Cập nhật mật khẩu và cài đặt bảo mật
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Đổi mật khẩu</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
} 