"use client"
import { AppProgressBar } from 'next-nprogress-bar';
// import { PagesTopLoader } from 'nextjs-toploader/pages';

export const ProgressBar = () => {
    // return <PagesTopLoader color='oklch(54.6% 0.245 262.881)' />
    return <AppProgressBar 
        color="oklch(54.6% 0.245 262.881)" 
        options={{ showSpinner: true }}
        style="z-index: 999999"
        height='20px'
    />
}