import { getHeaders } from "@/lib/utils/headers";
import LayoutClient from "./LayoutClient"
import { getUserProfile } from "@/actions/user.action"


const DefaultLayout = async ({ children }: { children: React.ReactNode }) => {
    const profileRes = await getUserProfile();
    const isUserPro = await getHeaders("x-user-pro");
    
    return (
        <LayoutClient isUserPro={isUserPro} profile={profileRes.data}>
            <>
                {children}
            </>
        </LayoutClient>
    )
}

export default DefaultLayout