import React from "react"

interface HeroProps {
    children: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
    children
}) => {
    return (
        <div className="relative z-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="-z-10 absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="z-10">
                {children}
            </div>
        </div>
    );
};

export default Hero;