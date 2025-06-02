import { getRoleAndCountAll } from "@/actions/role.action";
import RolesClient from "./RolesClient";

interface RolesPageProps {
  searchParams: Promise<{
    q?: string;
    limit?: string;
    page?: string;
  }>
}

export default async function RolesPage({
  searchParams
}: RolesPageProps) {
  const { limit = "10", page = "1", ...rest } = await searchParams;

  const roleRes = await getRoleAndCountAll({
    limit,
    page,
    ...rest
  });
  
  if (!roleRes.data) {
    throw new Error(roleRes.status.toString())
  }

  return (
    <RolesClient data={roleRes.data} />
  )
} 