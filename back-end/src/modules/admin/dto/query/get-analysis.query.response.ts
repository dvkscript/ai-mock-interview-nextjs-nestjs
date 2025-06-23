import { UserEntity } from "src/modules/users/entities/user.entity";
import { UserProviderEntity } from "src/modules/users/entities/user_provider.entity";

export class GetAnalysisQueryResponse {
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
        },
    }[];

    constructor(data: Omit<GetAnalysisQueryResponse, "users"> & { providers: UserProviderEntity[] }) {
        this.feedbackCount = data.feedbackCount;
        this.jobCount = data.jobCount;
        this.userCount = data.userCount;
        this.payTotalAmount = data.payTotalAmount;
        this.users = data.providers.map(provider => {

            return {
                id: provider.user.id,
                thumbnail: provider.user?.profile?.thumbnail,
                fullName: provider.user.fullName,
                email: provider.user.email,
                createdAt: provider.user.createdAt,
                provider: {
                    id: provider.id,
                    name: provider.name,
                    createdAt: provider.createdAt,
                    updatedAt: provider.updatedAt
                },
            }
        })
    }
}