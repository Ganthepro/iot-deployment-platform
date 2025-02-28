import React from "react";

interface CardLayoutProps {
    children: React.ReactNode;
}

export default function CardLayout({ children }: CardLayoutProps) {
    return (
        <div className="flex flex-col w-screen h-screen fixed -top-[28px] left-0 z-50 backdrop-blur-sm items-center justify-center">
            {children}
        </div>
    );
}
