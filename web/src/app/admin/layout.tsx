import LayoutClient from "./LayoutClient"
import { getProfile } from "@/actions/auth.action";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profileRes = await getProfile();
  
  return (
    <LayoutClient profile={profileRes.data}> 
      {children}
    </LayoutClient>
  )
} 