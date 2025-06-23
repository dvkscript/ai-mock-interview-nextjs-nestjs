"use server"

import responseAPI from "@/lib/api/response.api"
import { JobStatus } from "@/lib/api/Types/job";
import defaultApi from "@/lib/axios/default";
import { SearchParams } from "next/dist/server/request/search-params";

export type GetAdminAnalysis = {
    feedbackCount: number;
    jobCount: number;
    userCount: number;
    payTotalAmount: number;
    users: {
        id: string;
        thumbnail?: string;
        fullName: string;
        email: string;
        createdAt: Date;
        provider: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }
    }[];
}
export const getAdminAnalysis = responseAPI.catchError(
    async (limit?: string) => {
        const res = await defaultApi.get<GetAdminAnalysis>("/admin/analysis", {
            params: {
                limit
            }
        });
        return responseAPI.success(res)
    }
)

export type GetAdminJobs = {
    count: number;
    rows: {
        id: string;
        position: string;
        description: string;
        yearsOfExperience: number;
        averageScore: number;
        status: JobStatus;
        createdAt: Date;
        updatedAt: Date;
        userName: string;
        thumbnail?: string;
    }[]
}

export const getAdminJobs = responseAPI.catchError(
    async (searchParams: SearchParams) => {
        const res = await defaultApi.get(`/admin/jobs`, {
            params: searchParams
        });

        return responseAPI.success<GetAdminJobs | null>(res);
    }
)

export type GetAdminPays = {
    count: number;
    rows: {
        id: string;
        amount: number;
        currency: string;
        description: string;
        status: string;
        paymentMethodTypes: string[];
        createdAt: Date;
        updatedAt: Date;
        userName: string;
        thumbnail?: string;
    }[]
}

export const getAdminPays = responseAPI.catchError(
    async (searchParams: SearchParams) => {
        const res = await defaultApi.get(`/admin/pays`, {
            params: searchParams
        });

        return responseAPI.success<GetAdminPays | null>(res);
    }
)