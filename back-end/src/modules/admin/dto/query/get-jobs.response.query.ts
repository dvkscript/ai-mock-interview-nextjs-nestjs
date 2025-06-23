import { JobEntity } from "src/modules/jobs/entities/job.entity";
import { JobStatus } from "src/modules/shared/enum/job-status";

export class GetJobsResponseQuery {
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

    constructor(job: JobEntity) {
        this.id = job.id;
        this.position = job.position;
        this.description = job.description;
        this.yearsOfExperience = job.yearsOfExperience;
        this.averageScore = job.averageScore;
        this.status = job.status;
        this.createdAt = job.createdAt;
        this.updatedAt = job.updatedAt;
        this.userName = job.user.fullName;
        this.thumbnail = job.user.profile?.thumbnail;
    }
}