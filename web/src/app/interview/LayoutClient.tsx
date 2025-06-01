"use client"
import { GetProfile } from "@/actions/auth.action";
import { useUserStore } from "@/stores/userStore";
import React, { useEffect } from "react"

interface LayoutClientProps { 
    profile: GetProfile | null;
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