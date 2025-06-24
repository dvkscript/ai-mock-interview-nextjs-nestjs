import { getAdminJobs } from "@/actions/admin.action";
import InterviewClient from "./InterviewClient";

export const dynamic = 'force-dynamic';

// interface InterviewsPageProps {
//   searchParams: Promise<{
//     page: string;
//   }>
// }

export default async function InterviewsPage({ }) {
  // const { page = "1", ...rest } = await searchParams;

  const limit = "10";

  const newSearchParams = {
    page: "1",
    // ...rest,
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