import { getAdminPays } from "@/actions/admin.action";
import PayClient from "./PayClient";

interface PayClientProps {
  searchParams: Promise<{
    page: string;
  }>
}

export default async function PaysPage({ searchParams }: PayClientProps) {
  const { page = "1" } = await searchParams;
  const limit = "10"

  const res = await getAdminPays({
    page,
    limit
  });

  if (!res.ok || !res.data) {
    throw new Error(res.status.toString());
  }

  return (
    <PayClient data={res.data} limit={limit} />
  )
}
