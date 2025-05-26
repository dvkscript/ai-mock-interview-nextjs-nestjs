"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

// Mock data - trong thực tế sẽ lấy từ API
const mockRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Quản trị viên hệ thống",
    permissions: {
      admin: true,
      "hàng_quyền": {
        create: true,
        read: true,
        update: true,
        delete: true
      },
      "người_dùng": {
        create: true,
        read: true,
        update: true,
        delete: true
      },
      "thanh_toán": {
        create: true,
        read: true,
        update: true,
        delete: true
      }
    }
  },
  {
    id: 2,
    name: "Moderator",
    description: "Điều hành viên",
    permissions: {
      admin: false,
      "hàng_quyền": {
        create: false,
        read: true,
        update: true,
        delete: false
      },
      "người_dùng": {
        create: false,
        read: true,
        update: true,
        delete: false
      },
      "thanh_toán": {
        create: false,
        read: true,
        update: true,
        delete: false
      }
    }
  },
  {
    id: 3,
    name: "User",
    description: "Người dùng thông thường",
    permissions: {
      admin: false,
      "hàng_quyền": {
        create: false,
        read: true,
        update: false,
        delete: false
      },
      "người_dùng": {
        create: false,
        read: true,
        update: false,
        delete: false
      },
      "thanh_toán": {
        create: false,
        read: true,
        update: false,
        delete: false
      }
    }
  }
]

export default function EditRolePage() {
  const params: any = useParams()
  const [role, setRole] = useState<any>(null)
  const [permissions, setPermissions] = useState<Record<string, any>>({
    admin: false,
    "hàng_quyền": {
      create: false,
      read: false,
      update: false,
      delete: false
    },
    "người_dùng": {
      create: false,
      read: false,
      update: false,
      delete: false
    },
    "thanh_toán": {
      create: false,
      read: false,
      update: false,
      delete: false
    }
  })

  useEffect(() => {
    // Trong thực tế sẽ gọi API để lấy thông tin role
    const foundRole = mockRoles.find(r => r.id === parseInt(params.id))
    if (foundRole) {
      setRole(foundRole)
      setPermissions(foundRole.permissions)
    }
  }, [params.id])

  const togglePermission = (group: string, action?: string) => {
    if (group === 'admin') {
      setPermissions(prev => ({
        ...prev,
        admin: !prev.admin
      }))
    } else if (action) {
      setPermissions(prev => ({
        ...prev,
        [group]: {
          ...prev[group],
          [action]: !prev[group][action]
        }
      }))
    }
  }

  if (!role) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/roles">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Chỉnh sửa vai trò</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Cập nhật thông tin vai trò
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin vai trò</CardTitle>
          <CardDescription>
            Cập nhật thông tin chi tiết về vai trò
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Tên vai trò
              </label>
              <Input 
                id="name" 
                placeholder="Nhập tên vai trò"
                defaultValue={role.name}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Mô tả
              </label>
              <Textarea 
                id="description" 
                placeholder="Nhập mô tả vai trò"
                rows={3}
                defaultValue={role.description}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Quyền hạn
                </label>
                
                {/* Admin Access */}
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Quyền Admin</h3>
                      <p className="text-sm text-gray-500">Truy cập trang quản trị</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="admin"
                        checked={permissions.admin}
                        onChange={() => togglePermission('admin')}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="admin" className="text-sm">
                        Cho phép
                      </label>
                    </div>
                  </div>
                </div>

                {/* Hàng quyền */}
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-medium">Hàng quyền</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['create', 'read', 'update', 'delete'].map((action) => (
                      <div key={action} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`hàng_quyền_${action}`}
                          checked={permissions.hàng_quyền[action]}
                          onChange={() => togglePermission('hàng_quyền', action)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`hàng_quyền_${action}`} className="text-sm">
                          {action === 'create' ? 'Thêm mới' :
                           action === 'read' ? 'Xem' :
                           action === 'update' ? 'Sửa' : 'Xóa'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Người dùng */}
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-medium">Người dùng</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['create', 'read', 'update', 'delete'].map((action) => (
                      <div key={action} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`người_dùng_${action}`}
                          checked={permissions.người_dùng[action]}
                          onChange={() => togglePermission('người_dùng', action)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`người_dùng_${action}`} className="text-sm">
                          {action === 'create' ? 'Thêm mới' :
                           action === 'read' ? 'Xem' :
                           action === 'update' ? 'Sửa' : 'Xóa'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thanh toán */}
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-medium">Thanh toán</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['create', 'read', 'update', 'delete'].map((action) => (
                      <div key={action} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`thanh_toán_${action}`}
                          checked={permissions.thanh_toán[action]}
                          onChange={() => togglePermission('thanh_toán', action)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={`thanh_toán_${action}`} className="text-sm">
                          {action === 'create' ? 'Thêm mới' :
                           action === 'read' ? 'Xem' :
                           action === 'update' ? 'Sửa' : 'Xóa'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/roles">
                <Button variant="outline">Hủy</Button>
              </Link>
              <Button type="submit">Lưu thay đổi</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 