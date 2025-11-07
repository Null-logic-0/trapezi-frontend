"use client";

import { NAV_LINKS } from "@/helpers/navLinks";
import { useMessages } from "@/hooks/useMessages";
import Link from "next/link";

function QuickLinks() {
  const messages = useMessages();
  const LINKS = NAV_LINKS(messages);
  return (
    <div>
      <h4 className="font-semibold text-[16px] mb-3">{messages.quick_links}</h4>
      <ul className="space-y-2">
        {LINKS.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="text-[#fafafa]/80 hover:text-[#fafafa] text-sm transition-colors"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuickLinks;
