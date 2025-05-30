"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { roleFormData } from "../data"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function AddRolePage() {
  // const [permissions, setPermissions] = useState<Record<string, boolean>>({})

  // const togglePermission = (group: string, action?: string) => {
  //   if (group === 'admin') {
  //     // setPermissions(prev => ({
  //     //   ...prev,
  //     //   admin: !prev.admin
  //     // }))
  //   } else if (action) {
  //     // setPermissions(prev => ({
  //     //   ...prev,
  //     //   [group]: {
  //     //     ...prev[group],
  //     //     [action]: !prev[group][action]
  //     //   }
  //     // }))
  //   }
  // }

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
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Tên vai trò
              </label>
              <Input id="name" placeholder="Nhập tên vai trò" />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Mô tả
              </label>
              <Textarea
                id="description"
                placeholder="Nhập mô tả vai trò"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Quyền hạn
                </label>

                {
                  roleFormData.map((item) => {
                    if (item.id === "admin") {
                      return <>
                        <div className="p-4 border rounded-lg space-y-2">
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
                      </>
                    }
                    return <>
                      <div className="p-4 border rounded-lg space-y-2">
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
                    </>
                  })
                }

              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/roles">
                <Button variant="outline">Hủy</Button>
              </Link>
              <Button type="submit">Lưu</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 