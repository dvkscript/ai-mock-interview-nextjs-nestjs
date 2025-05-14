import { z } from "zod";
import { JobStatus } from "../api/Types/job";

export const UpdateJobSchema = z.object({
    progressAnswer: z.number().min(1).optional(),
    status: z.enum([JobStatus.CANCELLED, JobStatus.IN_PROGRESS, JobStatus.COMPLETED, JobStatus.NOT_STARTED, JobStatus.REVIEWED]).optional(),
    position: z.string().min(1).max(225).optional(),
    description: z.string().min(0).max(500).optional()
})

export type TUpdateJob = z.infer<typeof UpdateJobSchema>