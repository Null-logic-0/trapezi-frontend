import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type NavigationProps = {
  path: string;
  children: React.ReactNode;
  className?: string;
};

function Navigation({ path, children, className }: NavigationProps) {
  return (
    <Link
      href={path}
      className={twMerge(
        "text-center text-[#6d6d6d] cursor-pointer text-sm font-semibold transition-all duration-300 ease-in-out hover:text-[#ff6633] hover:underline underline-offset-4",
        className
      )}
    >
      {children}
    </Link>
  );
}

export default Navigation;
