import { IsEnum, IsString } from "class-validator";
import Stripe from "stripe";

export enum PeriodPayInput {
    YEARLY = "yearly",
    MONTHLY = "monthly",
}

export class CreatePayInputDto {
    @IsEnum(PeriodPayInput)
    period: PeriodPayInput;

    @IsString()
    paymentMethodId: Stripe.PaymentIntentCreateParams["payment_method"];
}