"use client"
import envConfig from "@/configs/env.config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import React from "react"

const stripePublicKey = envConfig.stripePublicKey;

if (!stripePublicKey) {
    throw new Error("STRIPE KEY not found")
};

const stripe = loadStripe(stripePublicKey);

interface StripeProviderProps {
    options?: StripeElementsOptions;
    children?: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({
    options,
    children
}) => {
    const lang = useParams().lang
    const { resolvedTheme } = useTheme();

    return (
        <Elements
            stripe={stripe}
            options={{
                mode: "payment" as any,
                amount: 50,
                currency: "usd",
                appearance: {
                    theme: resolvedTheme === "dark" ? "night" : "stripe",
                },
                locale: lang as StripeElementsOptions["locale"],
                ...options,
                payment_method_types: ['card'],
                paymentMethodCreation: "manual"
            }}
        >
            {children}
        </Elements>
    );
};

export default StripeProvider;