"use client"
import { AppProgressBar } from 'next-nprogress-bar';

export const ProgressBar = () => {
    return <AppProgressBar 
        color="oklch(54.6% 0.245 262.881)" 
        options={{ showSpinner: false }}
    />
}