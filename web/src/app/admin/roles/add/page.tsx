"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { roleFormData } from "../data"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { CreateRoleSchema, TCreateRole } from "@/lib/validators/create-role.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AdminRole } from "@/enums/role"
import { createRole } from "@/actions/role.action"
import { toast } from "sonner"

export default function AddRolePage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TCreateRole>({
    resolver: zodResolver(CreateRoleSchema),
    defaultValues: {
      name: "",
      permissions: [AdminRole.AdminAccess]
    }
  });

  const onSubmit = useCallback((data: TCreateRole) => {
    startTransition(async () => {
      const res = await createRole(data);
      if (!res.ok) {
        toast.error(res.message)
      } else {
        toast.success("Thêm vai trò thành công")
        form.reset()
      }
    })
  }, [form])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/roles">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Thêm vai trò mới</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Tạo vai trò mới trong hệ thống
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin vai trò</CardTitle>
          <CardDescription>
            Điền thông tin chi tiết về vai trò mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Tên vai trò
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên vai trò"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Quyền hạn
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {
                          roleFormData.map((item) => {
                            if (item.id === "admin") {
                              return <div className="p-4 border rounded-lg space-y-2" key={item.id}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="font-medium">
                                      {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">Truy cập trang quản trị</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={field.value.includes(AdminRole.AdminAccess)}
                                      {...field}
                                      onCheckedChange={(checked) => {
                                        const newValue = checked
                                          ? [...field.value, AdminRole.AdminAccess]
                                          : field.value.filter((v) => v !== AdminRole.AdminAccess);
                                        field.onChange(newValue);
                                      }}
                                      disabled={isPending}
                                    />
                                  </div>
                                </div>
                              </div>
                            }
                            return <div className="p-4 border rounded-lg space-y-3" key={item.id}>
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">
                                  {item.name}
                                </h3>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  type="button"
                                  onClick={() => {
                                    const allChecked = item.data.every(role => field.value.includes(role));
                                    const newValue = allChecked
                                      ? field.value.filter(v => !item.data.includes(v))
                                      : [...field.value, ...item.data.filter(role => !field.value.includes(role))];
                                    field.onChange(newValue);
                                  }}
                                >
                                  {item.data.every(role => field.value.includes(role)) ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                                </Button>
                              </div>
                              <div className="flex items-center justify-between pr-2">
                                {item.data.map((role, index) => {
                                  return <div key={index} className="flex items-center gap-2">
                                    <Switch
                                      checked={field.value.includes(role)}
                                      {...field}
                                      onCheckedChange={(checked) => {
                                        const newValue = checked
                                          ? [...field.value, role]
                                          : field.value.filter((v) => v !== role);
                                        field.onChange(newValue);
                                      }}
                                      disabled={isPending}
                                    />
                                    <Label htmlFor={`${item.id}-${index}`}>
                                      {
                                        role.endsWith("-read") && "Xem"
                                      }
                                      {
                                        role.endsWith("-create") && "Thêm"
                                      }
                                      {
                                        role.endsWith("-update") && "Sửa"
                                      }
                                      {
                                        role.endsWith("-delete") && "Xóa"
                                      }
                                    </Label>
                                  </div>
                                })}
                              </div>
                            </div>
                          })
                        }
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Quyền hạn
                  </label>

                  {
                    roleFormData.map((item) => {
                      if (item.id === "admin") {
                        return <div className="p-4 border rounded-lg space-y-2" key={item.id}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">Truy cập trang quản trị</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="airplane-mode" />
                            </div>
                          </div>
                        </div>
                      }
                      return <div className="p-4 border rounded-lg space-y-2" key={item.id}>
                        <h3 className="font-medium">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between pr-2">
                          {item.data.map((role, index) => {
                            return <div key={index} className="flex items-center gap-2">
                              <Switch id={`${item.id}-${index}`} value={role} />
                              <Label htmlFor={`${item.id}-${index}`}>
                                {
                                  role.endsWith("-read") && "Xem"
                                }
                                {
                                  role.endsWith("-create") && "Thêm"
                                }
                                {
                                  role.endsWith("-update") && "Sửa"
                                }
                                {
                                  role.endsWith("-delete") && "Xóa"
                                }
                              </Label>
                            </div>
                          })}
                        </div>
                      </div>
                    })
                  }

                </div>
              </div> */}

              <div className="flex justify-end gap-4">
                <Link href="/admin/roles">
                  <Button variant="outline">Hủy</Button>
                </Link>
                <Button type="submit">Lưu</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
} 