import { addDays } from 'date-fns';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getProfile, getRefreshToken } from './actions/auth.action';
import { AdminRole, UserRole } from './enums/role';
import { isPermission } from './lib/utils';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    const cookie = request.cookies
    // const pageLogout = cookie.get("page-logout")?.value || "user"; 

    if (pathname.startsWith("/auth")) {
        if (cookie.get('accessToken')?.value) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        };
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (!accessToken || !refreshToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        const res = NextResponse.redirect(new URL('/dashboard', request.url));
        res.cookies.set({
            expires: addDays(new Date(), 100),
            name: 'accessToken',
            value: accessToken
        })
        res.cookies.set({
            name: 'refreshToken',
            value: refreshToken,
            expires: addDays(new Date(), 100),
        });
        return res
    }

    const { ok, status, data } = await getProfile();


    const refreshToken = cookie.get('refreshToken')?.value;
    const accessToken = cookie.get('accessToken')?.value;

    if (!ok) {
        if (status !== 401 || !refreshToken || !accessToken) {
            if (!pathname.startsWith("/login") && pathname !== "/") {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } else if (refreshToken) {
            const resfresh = await getRefreshToken(refreshToken);

            if (!resfresh.ok) {
                const redirect = NextResponse.redirect(new URL('/login', request.url));
                redirect.cookies.delete('accessToken');
                redirect.cookies.delete('refreshToken');
                return redirect;
            }
            const res = NextResponse.next();
            res.cookies.set({
                expires: addDays(new Date(), 100),
                name: 'accessToken',
                value: resfresh.data.accessToken
            })
            res.cookies.set({
                name: 'refreshToken',
                value: resfresh.data.refreshToken,
                expires: addDays(new Date(), 100),
            });
            return res;
        }
    } else {
        if (pathname.startsWith("/login") || pathname === "/") {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        const headers = request.headers;
        headers.set("x-user-pro", (isPermission(data?.permissions || [], [UserRole.PRO, AdminRole.AdminAccess]) || "false").toString());
        return NextResponse.next({
            request: {
                headers
            }
        });
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}