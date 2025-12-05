"use client";
import { GrInstagram } from "react-icons/gr";
import { SlSocialLinkedin } from "react-icons/sl";
import { useMessages } from "@/hooks/useMessages";

function SocialMedia() {
  const messages = useMessages();
  const instagram =
    "https://www.instagram.com/trapezi.ge/?igsh=MW9ramVtbzM2bGFoeQ%3D%3D&utm_source=qr#";
  return (
    <div>
      <h4 className="font-semibold mb-4">{messages.follow}</h4>
      <div className="flex gap-4">
        <a
          target="_blank"
          href={instagram}
          className="text-[#fafafa]/80 hover:text-[#ff6b35] transition-colors"
        >
          <GrInstagram className="text-xl" />
        </a>

        <a
          target="_blank"
          href="https://www.linkedin.com/company/trapezi-ge"
          className="text-[#fafafa]/80 hover:text-[#ff6b35] transition-colors"
        >
          <SlSocialLinkedin className="text-xl" />
        </a>
      </div>
    </div>
  );
}

export default SocialMedia;
