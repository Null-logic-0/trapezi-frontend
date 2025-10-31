"use client";

import { POLICIES_LINKS } from "@/helpers/policiesLinks";
import { useMessages } from "@/hooks/useMessages";
import Link from "next/link";

function Legal() {
  const messages = useMessages();
  const LINKS = POLICIES_LINKS(messages);
  return (
    <div>
      <h4 className="font-semibold text-[16px] mb-4">{messages.policies}</h4>
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

export default Legal;
