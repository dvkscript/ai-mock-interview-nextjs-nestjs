"use client"
import React from "react"


const Loading = ({ }) => {
    return <>
        <div className='absolute inset-0 flex items-center justify-center'>
            <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-indigo-600"></div>
        </div>
    </>
};

export default Loading;