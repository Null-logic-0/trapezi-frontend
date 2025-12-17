"use client";
import { GrInstagram } from "react-icons/gr";
import { SlSocialLinkedin } from "react-icons/sl";
import { useMessages } from "@/hooks/useMessages";

const instagram =
  "https://www.instagram.com/trapezi.ge/?igsh=MW9ramVtbzM2bGFoeQ%3D%3D&utm_source=qr#";

const linkedin = "https://www.linkedin.com/company/trapezi-ge";

function SocialMedia() {
  const messages = useMessages();

  return (
    <div>
      <h4 className="font-semibold mb-4">{messages.follow}</h4>
      <div className="flex gap-4">
        <a
          target="_blank"
          href={linkedin}
          className="text-[#fafafa]/80 hover:text-[#ff6b35] transition-colors"
        >
          <SlSocialLinkedin className="text-xl" />
        </a>
        <a
          target="_blank"
          href={instagram}
          className="text-[#fafafa]/80 hover:text-[#ff6b35] transition-colors"
        >
          <GrInstagram className="text-xl" />
        </a>
      </div>
    </div>
  );
}

export default SocialMedia;
