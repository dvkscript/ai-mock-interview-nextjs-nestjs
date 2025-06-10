"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next-nprogress-bar"
import { useEffect, useMemo, useState, useTransition } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Eye, EyeOff } from "lucide-react"
import { GetUserDetail, updateUser } from "@/actions/user.action"
import MultipleSelector, { Option } from "@/components/ui/multi-select"
import { GetRoleAll } from "@/actions/role.action"
import { Switch } from "@/components/ui/switch"
import dayjs from "@/lib/utils/dayjs"
import DatePicker from "./_components/DatePicker"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TUpdateUser, UpdateUserSchema } from "@/lib/validators/update-user.validator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DateRange } from "react-day-picker"
import { toast } from "sonner"

interface EditUserClientProps {
  user: GetUserDetail;
  roles: GetRoleAll
}

export default function EditUserClient({
  user,
  roles
}: EditUserClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: [],
      userPro: undefined
    }
  });

  const roleSelectOptions = useMemo(() => {
    return roles.map((r) => {
      return {
        label: r.name,
        value: r.id,
      } as Option
    })
  }, [roles]);

  const onSubmit = (data: TUpdateUser) => {
    startTransition(async () => {
      const toastId = toast.loading("Đang cập nhật...")
      const res = await updateUser(user.id, data);
      
      toast.dismiss(toastId);
      if (!res.ok) {
        toast.error(res.message)
      } else {
        toast.success("Cập nhật thành công")
      }
    })
  }

  useEffect(() => {
    form.reset({
      fullName: user.fullName,
      email: user.email,
      password: "",
      confirmPassword: "",
      roles: user.roles.map((r) => r.id),
    })
  }, [form, user])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Chỉnh sửa người dùng</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Cập nhật thông tin người dùng trong hệ thống
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-8">
            <Card className="border-none shadow-xl bg-gradient-to-b from-background to-muted/5 py-10">
              <CardContent>
                <div className="grid gap-12">
                  <div className="flex items-start gap-16">
                    <div className="w-[300px] flex flex-col items-center gap-6 p-8 bg-gradient-to-b from-muted/50 to-muted/30 rounded-2xl border shadow-md">
                      <div className="relative group">
                        <Avatar className="size-52 rounded-2xl ring-4 ring-background shadow-lg">
                          <AvatarImage src={user.thumbnail} alt={user.fullName} />
                          <AvatarFallback className="rounded-2xl text-5xl">
                            {user.fullName?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 size-full"
                          >
                            <Camera className="size-12" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="font-bold text-2xl">{user.fullName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid gap-12 grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Họ và tên
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nhập họ và tên"
                                className="h-12 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Mật khẩu mới
                            </FormLabel>
                            <FormControl>
                              <div className="relative w-full">
                                <Input
                                  placeholder="Nhập mật khẩu mới"
                                  className="h-12 text-base"
                                  type={showPassword ? "text" : "password"}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nhập email"
                                className="h-12 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Xác nhận mật khẩu
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nhập lại mật khẩu mới"
                                className="h-12 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="roles"
                        render={({ field }) => {
                          let selectValues: Option[] = []
                          if (field?.value?.length > 0) {
                            selectValues = field.value.map((o) => roleSelectOptions.find((r) => r.value === o) || null).filter((o) => !!o)
                          } else {
                            selectValues = []
                          }

                          return <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              Vai trò
                            </FormLabel>
                            <MultipleSelector
                              defaultOptions={roleSelectOptions}
                              placeholder="Chọn vai trò"
                              emptyIndicator={
                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                  Không có vai trò
                                </p>
                              }
                              value={selectValues}
                              onChange={(options) => {
                                field.onChange(options.map((option) => option.value))
                              }}
                              className="h-12"
                            />
                            <FormMessage />
                          </FormItem>
                        }}
                      />

                      {/* <div className="space-y-3">
                      <Label htmlFor="role" className="text-base font-medium">Vai trò</Label>
                      <MultipleSelector
                        defaultOptions={roleSelectOptions}
                        placeholder="Chọn vai trò"
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Không có vai trò
                          </p>
                        }
                        value={selectRoles}
                        onChange={setSelectRoles}
                      />
                    </div> */}

                      <FormField
                        control={form.control}
                        name="userPro"
                        render={({ field }) => {
                          const value: DateRange = {
                            from: field.value?.startTime ? dayjs(field.value.startTime).toDate() : undefined,
                            to: field.value?.endTime ? dayjs(field.value.endTime).toDate() : undefined,
                          };

                          const isDisable = !field.value;

                          const onChange = (value: DateRange | undefined) => {
                            if (!value) return field.onChange(null);
                            const newValue = {
                              startTime: value?.from,
                              endTime: value?.to,
                            }
                            field.onChange(newValue);
                          }

                          return <FormItem>
                            <FormLabel className="flex justify-start items-center gap-2">
                              <span>
                                Kích hoạt tài khoản Pro
                              </span>
                              <Switch
                                id="isPro"
                                checked={!isDisable}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked ? { startTime: null, endTime: null } : null);
                                }}
                                className="ml-auto"
                              />
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                id="startTime"
                                placeholder="Thời gian bắt đầu"
                                isDisable={isDisable}
                                className="h-10"
                                onChange={(value) => {
                                  onChange(value)
                                }}
                                value={value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        }}
                      />
                      {/* <div className="space-y-3">
                      <div className="flex gap-3 justify-between items-center">
                        <Label className="text-base font-medium" htmlFor="isPro">Tài khoản Pro</Label>
                        <Switch
                          id="isPro"
                          checked={formData.isPro}
                          onCheckedChange={(checked) => setFormData({ ...formData, isPro: checked })}
                        />
                      </div>
                      <div >

                      </div>
                    </div> */}

                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-12 px-8 text-base"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-12 px-8 text-base"
              >
                {isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
} 