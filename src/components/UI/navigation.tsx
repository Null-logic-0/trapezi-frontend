import Link from "next/link";
import React from "react";

type NavigationProps = {
  path: string;
  children: React.ReactNode;
};

function Navigation({ path, children }: NavigationProps) {
  return (
    <Link
      href={path}
      className="text-center text-[#6d6d6d] cursor-pointer text-sm font-semibold transition-all duration-300 ease-in-out hover:text-[#ff6633] hover:underline underline-offset-4"
    >
      {children}
    </Link>
  );
}

export default Navigation;
