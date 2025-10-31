"use client";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";
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
          className="text-[#fafafa]/80 hover:text-[#fafafa] transition-colors"
        >
          <LuFacebook className="text-xl" />
        </a>
        <a
          target="_blank"
          href="#"
          className="text-[#fafafa]/80 hover:text-[#fafafa] transition-colors"
        >
          <GrInstagram className="text-xl" />
        </a>
        <a
          target="_blank"
          href="#"
          className="text-[#fafafa]/80 hover:text-[#fafafa] transition-colors"
        >
          <PiTiktokLogoBold className="text-xl" />
        </a>

        <a
          target="_blank"
          href="#"
          className="text-[#fafafa]/80 hover:text-[#fafafa] transition-colors"
        >
          <SlSocialLinkedin className="text-xl" />
        </a>
      </div>
    </div>
  );
}

export default SocialMedia;
