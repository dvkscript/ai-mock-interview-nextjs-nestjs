import { getJobs } from "@/actions/job.action";
import HistoryClient from "./HistoryClient"

type HistoryPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

const limit = 10;
const page = 1;

export default async function HistoryPage({
    searchParams
}: HistoryPageProps) {
    const search = await searchParams;


    const jobRes = await getJobs({
        page,
        ...search,
        limit,
    });

    const data = jobRes.data;

    if (!jobRes.ok || !data) {
        throw new Error(jobRes.message)
    }


    return (
        <HistoryClient jobs={data.rows} count={data.count} limit={limit} />
    )
} 