"use client";

import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
    PaymentElementProps,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { useUserStore } from "@/stores/userStore";

interface StripeCardProps extends PaymentElementProps {
    onSubmit?: (values: { stripe: Stripe, elements: StripeElements }) => void;
    errorMsg?: string;
    children?: React.ReactNode;
    onLoaded?: (isLoaded: boolean) => void;
}

const StripeCard = ({
    onSubmit,
    children,
    errorMsg,
    onLoaded,
    ...props
}: StripeCardProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const { profile } = useUserStore();
    const [errorMessage, setErrorMessage] = useState<string>();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        if (onSubmit) onSubmit({
            stripe,
            elements,
        });
    };

    useEffect(() => {
        setErrorMessage(errorMsg);
    }, [errorMsg]);

    useEffect(() => {
        if (onLoaded) {
            onLoaded(!!stripe && !!elements)
        }
    },[stripe, elements, onLoaded])

    if (!stripe || !elements || !profile) {
        return (
            <div className="flex items-center justify-center p-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement
                options={{
                    layout: "auto",
                    business: {
                        name: "AI Mock Interview",
                    },
                    defaultValues: {
                        billingDetails: {
                            email: profile.email,
                            name: profile.fullName,
                        }
                    },
                    terms: {
                        card: "always"
                    },
                    paymentMethodOrder: ["card"],
                    ...props,
                }}
                onLoadError={(e) => {
                    setErrorMessage(e.error.message)
                }}
            />
            {errorMessage && (
                <div className="pt-2">
                    <span className="text-danger">{errorMessage}</span>
                </div>
            )}
            {children}
        </form>
    );
};

export default StripeCard;