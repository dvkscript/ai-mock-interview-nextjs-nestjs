import { getRole } from "@/actions/role.action"
import EditClient from "./EditClient";

interface EditRolePageProps {
  params: Promise<{
    id: string
  }>
}
export default async function EditRolePage({
  params
}: EditRolePageProps) {
  const { id } = await params;
  const roleRes = await getRole(id);

  if (!roleRes.ok || !roleRes.data) {
    throw new Error(roleRes.status.toString())
  }

  return (
    <EditClient role={roleRes.data} />
  )
} 