"use server"

import { headers } from "next/headers"

export const getHeaders = async (key: string) => {
    const header = await headers();
    const value = header.get(key);
    if (!value) return null;
    try {
        return JSON.parse(value)
    } catch {
        return value;
    };
}