"use client";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { SlSocialLinkedin } from "react-icons/sl";
import { PiTiktokLogoBold } from "react-icons/pi";
import { useMessages } from "@/hooks/useMessages";

function SocialMedia() {
  const messages = useMessages();
  return (
    <div>
      <h4 className="font-semibold mb-4">{messages.follow}</h4>
      <div className="flex gap-4">
        <a
          target="_blank"
          href="#"
          className="text-[#fafafa]/80 hover:text-[#ff6b35] transition-colors"
        >
          <LuFacebook className="text-xl" />
        </a>
        <a
          target="_blank"
          href="#"
          className="text-[#fafafa]/80 hover:text-[#ff6b35] transition-colors"
        >
          <GrInstagram className="text-xl" />
        </a>
        <a
          target="_blank"
          href="#"
          className="text-[#fafafa]/80 hover:text-[#ff6b35] transition-colors"
        >
          <PiTiktokLogoBold className="text-xl" />
        </a>

        <a
          target="_blank"
          href="#"
          className="text-[#fafafa]/80 hover:text-[#ff6b35] transition-colors"
        >
          <SlSocialLinkedin className="text-xl" />
        </a>
      </div>
    </div>
  );
}

export default SocialMedia;
