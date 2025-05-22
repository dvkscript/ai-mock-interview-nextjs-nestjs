import ClientOnly from "@/components/common/ClientOnly";
import React from "react"

interface LayoutProps { 
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    children
}) => {
  return (
    <ClientOnly>
        {children}
    </ClientOnly>
  );
};

export default Layout;