"use client"
import { GetUserProfile } from "@/actions/user.action";
import { useUserStore } from "@/stores/userStore";
import React, { useEffect } from "react"

interface LayoutClientProps { 
    profile: GetUserProfile | null;
    children: React.ReactNode;
}

const LayoutClient: React.FC<LayoutClientProps> = ({
    profile,
    children
}) => {
    const setProfile = useUserStore(s => s.setProfile);

    useEffect(() => {
        setProfile(profile)
    },[setProfile, profile])
  return (
    <>
        {children}
    </>
  );
};

export default LayoutClient;