"use client"
import { cn } from "@/lib/utils";
import React from "react"

interface ContainerProps { 
    className?: string
    children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    className,
    children
}) => {
  return (
    <div
        className={cn("container", className)}
    >
        {children}
    </div>
  );
};

export default Container;