import React from "react"
import LayoutClient from "./LayoutClient";
import { getUserProfile } from "@/actions/user.action";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = async ({
    children
}: LayoutProps) => {
    const profileRes = await getUserProfile()

    return (
        <LayoutClient profile={profileRes.data}>
            {children}
        </LayoutClient>
    );
};

export default Layout;