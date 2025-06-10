import { Metadata } from "next"
import EditUserClient from "./EditUserClient"
import { getUserDetail } from "@/actions/user.action"
import { getRoleAll } from "@/actions/role.action"

export const metadata: Metadata = {
  title: "Chỉnh sửa người dùng",
  description: "Chỉnh sửa thông tin người dùng trong hệ thống",
}

interface EditUserPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditUserPage({
  params
}: EditUserPageProps) {
  const { id } = await params;

  const [userRes, roleRes] = await Promise.all([
    getUserDetail(id),
    getRoleAll()
  ]);

  if (!userRes.ok || !userRes.data) {
    throw new Error(userRes.status.toString())
  } else if (!roleRes.ok || !roleRes.data) {
    throw new Error(roleRes.status.toString())
  }

  return <EditUserClient user={userRes.data} roles={roleRes.data} />
} 