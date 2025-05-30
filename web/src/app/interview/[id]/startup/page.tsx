import { getJobWithQuestion } from "@/actions/job.action";
import { JobStatus } from "@/lib/api/Types/job";
import { redirect } from "next/navigation";
import React from "react"
import StartupClient from "./StartupClient";

type StartupPageProps = {
    params: Promise<{
        id: string;
    }>
}

const StartupPage = async ({
    params
}: StartupPageProps) => {
    const { id } = await params;

    const jobRes = await getJobWithQuestion(id);

    const data = jobRes.data;

    if (!data) {
        throw new Error(jobRes.status.toString());
    }

    if (data.status === JobStatus.CREATE_FAILED) {
        return redirect(`/interview/${id}/error`)
    } else if (data.status !== JobStatus.CREATING) {
        return redirect(`/interview/${id}/room`);
    }

    return (
        <StartupClient />
    );
};

export default StartupPage;