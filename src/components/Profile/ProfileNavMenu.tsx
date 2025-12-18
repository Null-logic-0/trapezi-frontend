"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE_NAV_LINKS } from "@/helpers/profileNavLink";
import { useMessages } from "@/hooks/useMessages";

function ProfileNavMenu({
  isBusinessAccount,
}: {
  isBusinessAccount?: boolean;
}) {
  const pathname = usePathname();
  const messages = useMessages();

  const NAV_LINKS = PROFILE_NAV_LINKS(messages, isBusinessAccount);

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li
              key={link.key}
              className={`font-medium transition-all delay-75 text-lg px-2 py-1 rounded-xl ${
                isActive
                  ? "text-[#ff6933] bg-[#fff0eb] font-semibold"
                  : "text-[#2d2d2d] bg-transparent hover:text-[#ff6933] hover:bg-[#fff0eb]"
              }`}
            >
              <Link href={link.href} className="flex items-center gap-2 ">
                {link.icon} {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default ProfileNavMenu;
