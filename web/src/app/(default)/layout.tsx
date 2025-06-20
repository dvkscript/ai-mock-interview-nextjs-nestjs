import { getHeaders } from "@/lib/utils/headers";
import LayoutClient from "./LayoutClient"
import { getProfile } from "@/actions/auth.action";
import { getUserTest } from "@/actions/user.action";


const DefaultLayout = async ({ children }: { children: React.ReactNode }) => {
    const profileRes = await getProfile();
    const isUserPro = await getHeaders("x-user-pro");
    const test = await getUserTest();
    console.log(test);
    
    
    return (
        <LayoutClient isUserPro={isUserPro} profile={profileRes.data}>
            <>
                {children}
            </>
        </LayoutClient>
    )
}

export default DefaultLayout