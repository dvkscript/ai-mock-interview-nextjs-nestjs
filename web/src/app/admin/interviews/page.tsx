import { getAdminJobs } from "@/actions/admin.action";
import InterviewClient from "./InterviewClient";

interface InterviewsPageProps {
  searchParams?: Promise<{
    page: string;
  }>
}

export default async function InterviewsPage(props: InterviewsPageProps) {

  const limit = "10";
  const page = "1";

  const newSearchParams = {
    page,
    ...(await props.searchParams),
    limit,
  }

  const res = await getAdminJobs(newSearchParams)

  if (!res.ok || !res.data) {
    throw new Error(res.status.toString())
  }

  return (
    <InterviewClient data={res.data} limit={limit} />
  )
};