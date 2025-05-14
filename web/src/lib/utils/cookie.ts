"use server";

import { cookies } from "next/headers";
import { addDays } from "date-fns"

export const setCookie = async (name: string, value: string, expires?: Date) => {
    const cookie = await cookies();
    cookie.set({
        name,
        value,
        httpOnly: true,
        path: '/',
        expires: expires || addDays(new Date(), 100)
    })
}

export const getCookie = async (name: string) => {
    const cookie = await cookies();
    const value = cookie.get(name)?.value;

    try {
        return JSON.parse(value as string);
    } catch {
        return value;
    }
}

export const deleteCookie = async (name: string) => {
    const cookie = await cookies();
    cookie.delete(name);
}