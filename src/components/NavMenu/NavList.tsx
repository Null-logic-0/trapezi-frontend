"use client";

import { NAV_LINKS } from "@/helpers/navLinks";
import { useMessages } from "@/hooks/useMessages";
import { useUIContext } from "@/store/ui-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavList() {
  const pathname = usePathname();
  const messages = useMessages();
  const LINKS = NAV_LINKS(messages);
  const { handleToggleMenu } = useUIContext();

  return (
    <ul className="flex justify-center gap-4 items-center max-lg:flex-col">
      {LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li
            key={link.key}
            className={`transition-all delay-75 text-sm font-semibold   ${
              isActive
                ? "text-[#ff6933]"
                : "text-[#2d2d2d]  hover:text-[#ff6933]"
            }`}
          >
            <Link
              href={link.href}
              onClick={() => handleToggleMenu()}
              className="flex items-center gap-2 "
            >
              {link.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavList;
