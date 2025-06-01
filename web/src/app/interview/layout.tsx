import React from "react"
import LayoutClient from "./LayoutClient";
import { getProfile } from "@/actions/auth.action";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = async ({
    children
}: LayoutProps) => {
    const profileRes = await getProfile()

    return (
        <LayoutClient profile={profileRes.data}>
            {children}
        </LayoutClient>
    );
};

export default Layout;