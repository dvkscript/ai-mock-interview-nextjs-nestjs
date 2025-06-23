import { PayEntity } from "src/modules/pay/entities/pay.entity";

export class GetPaysQueryResponse {
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

    constructor(pay: PayEntity) {
        this.id = pay.id;
        this.amount = pay.amount;
        this.currency = pay.currency;
        this.description = pay.description;
        this.status = pay.status;
        this.paymentMethodTypes = pay.paymentMethodTypes
        this.createdAt = pay.createdAt;
        this.updatedAt = pay.updatedAt;
        this.userName = pay.user.fullName;
        this.thumbnail = pay.user.profile?.thumbnail;
    }
}