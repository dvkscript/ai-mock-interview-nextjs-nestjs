"use server"
import responseAPI from "@/lib/api/response.api";
import { Job, JobQuestionAnswer, JobWithQuestion, QuestionType } from "@/lib/api/Types/job";
import defaultApi from "@/lib/axios/default";
import { TCreateAnswer } from "@/lib/validators/create-answer.validator";
import { TGenerateQuestion } from "@/lib/validators/generate-question.validator";
import { TUpdateJob } from "@/lib/validators/update-job.validator";

export const GenerateQuestion = responseAPI.catchError(
    async (body: TGenerateQuestion) => {
        const job = await defaultApi.post("/jobs", {
            ...body,
            username: "Khoa",
            model: "gemini"
        });

        if (!job.data) {
            throw new Error("Create job failed")
        }

        return responseAPI.success({
            data: job.data
        })
    }
)

export const getJobWithQuestion = responseAPI.catchError(
    async (jobId: string) => {
        const job = await defaultApi.get("/jobs" + `/${jobId}`);

        if (!job.data) {
            throw new Error("Get job failed")
        }

        return responseAPI.success<JobWithQuestion>({
            data: job.data
        })
    }
)

export const createAnswer = responseAPI.catchError(
    async (body: TCreateAnswer) => {
        const res = await defaultApi.post<JobQuestionAnswer>("/jobs/question/answer", {
            ...body
        });
        if (!res.data) {
            throw new Error("Create answer failed")
        }
        return responseAPI.success({
            data: res.data
        })
    }
)

export const updateJob = responseAPI.catchError(
    async (jobId: string, body: TUpdateJob) => {
        const res = await defaultApi.patch<JobWithQuestion>(`/jobs/${jobId}`, {
            ...body
        });
        if (!res.data) {
            throw new Error("Update job failed")
        }
        return responseAPI.success({
            data: res.data
        })
    }
)

export type Feedback = {
    strengths: string[];
    weaknesses: string[];
    evaluationByCriteria: {
        type: QuestionType;
        score: number;
        summary: string;
        improvementSuggestions: string[];
    }[];
    overallComment: string;
    position: string;
    description: string;
    yearsOfExperience: number;
    averageScore: number;
}

export const getFeedback = responseAPI.catchError(
    async (id: string) => {
        const res = await defaultApi.get<Feedback | null>(`/jobs/${id}/feedback`);
        if (!res.data) {
            throw new Error("Get feedback failed")
        }
        return responseAPI.success({
            data: res.data
        })
    }
)

export const feedback = responseAPI.catchError(
    async (jobId: string) => {
        const res = await defaultApi.post<{ id: string } | null>(`/jobs/${jobId}/feedback`)
        if (!res.data) {
            throw new Error("Get feedback failed")
        }
        return responseAPI.success({
            data: res.data
        })
    }
)

export type GetJobAndCountAll = {
    count: number;
    rows: (Job & {
        feedback: ({
            id: string
        } | null)
    })[]
}

export const getJobs = responseAPI.catchError(
    async (searchParams?: { limit?: number, page?: number }) => {

        const res = await defaultApi.get<GetJobAndCountAll | null>("/jobs", {
            params: searchParams
        });
        if (!res.data) {
            throw new Error("Get Jobs failed")
        }
        return responseAPI.success({
            data: res.data
        })
    }
)

export const deleteJob = responseAPI.catchError(
    async (id: string) => {
        const res = await defaultApi.delete(`/jobs/${id}`)
        
        return responseAPI.success({
            data: res.data
        });
    }
)

export type GetJobAnalysis = {
    count: number;
    rows: (Job & {
        feedback: ({
            id: string
        } | null)
    })[];
    avgScore: number;
    completedCount: number;
    notCompletedCount: number;
}


export const getJobAnalysis = responseAPI.catchError(
    async (searchParams?: { limit?: number, page?: number }) => {

        const res = await defaultApi.get<GetJobAnalysis | null>("/jobs/analysis", {
            params: searchParams
        });

        if (!res.data) {
            throw new Error("Get Jobs failed")
        }
        return responseAPI.success({
            data: res.data
        })
    }
)