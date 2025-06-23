import { AdminRole } from "@/enums/role";

export const roleFormData = [
  {
    id: "admin",
    name: "Quản trị viên",
    data: [
      AdminRole.AdminAccess,
    ],
  },
  {
    id: "role",
    name: "Quản lý vai trò",
    data: [
      AdminRole.RoleRead,
      AdminRole.RoleCreate,
      AdminRole.RoleUpdate,
      AdminRole.RoleDelete,
    ]
  },
  {
    id: "user",
    name: "Quản lý người dùng",
    data: [
      AdminRole.UserRead,
      AdminRole.UserCreate,
      AdminRole.UserUpdate,
      AdminRole.UserDelete
    ]
  },
  {
    id: "pay",
    name: "Quản lý thanh toán",
    data: [
      AdminRole.PaymentRead,
      AdminRole.PaymentCreate,
      AdminRole.PaymentUpdate,
      AdminRole.PaymentDelete
    ]
  },
  {
    id: "job",
    name: "Quản lý Phỏng vấn",
    data: [
      AdminRole.JobRead,
      AdminRole.JobCreate,
      AdminRole.JobUpdate,
      AdminRole.JobDelete
    ]
  },
]