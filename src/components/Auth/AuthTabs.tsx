"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const tabs = [
    {label: "Login", href: "/login"},
    {label: "Signup", href: "/signup"},
];

function AuthTabs() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center my-4 justify-center gap-2 p-1.5 rounded-xl bg-[#ededed]">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;

                return (
                    <Link key={tab.href} href={tab.href} passHref className="w-full">
                        <button
                            className={`p-1.5 w-full cursor-pointer text-sm font-semibold rounded-lg
                                transition-all duration-300
                                ${
                                isActive
                                    ? "bg-[#FF6B35] text-white shadow-lg"
                                    : " text-[#666666] hover:scale-105 hover:text-[#FF6B35]"
                            }`}
                        >
                            {tab.label}
                        </button>
                    </Link>
                );
            })}
        </nav>
    );
}

export default AuthTabs;
