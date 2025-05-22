export type Pay = {
    id: string;
    amount: number;
    amountReceived: number;
    currency: string;
    latestCharge: string;
    paymentMethod: string;
    paymentMethodTypes: string[];
    receiptEmail: string;
    description?: string;
    status: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}