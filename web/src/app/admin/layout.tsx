import { getUserProfile } from "@/actions/user.action"
import LayoutClient from "./LayoutClient"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profileRes = await getUserProfile();
  
  return (
    <LayoutClient profile={profileRes.data}> 
      {children}
    </LayoutClient>
  )
} 