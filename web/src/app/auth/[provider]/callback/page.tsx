"use client";
import Loading from "@/components/common/Loading";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react"

const Page = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    const router = useRouter();

    useEffect(() => {
        if (message) {
            router.replace(`/login?message=${message}`)
        }
    }, [message, router]);

    return (
        <div>
            <Loading />
            <Link href={"./"}
                className="text-black/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-16 flex justify-center items-center font-bold"
            >
                Home
            </Link>
        </div>
    );
};

export default Page;