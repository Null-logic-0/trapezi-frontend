"use client";

import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

import { BsGlobe } from "react-icons/bs";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { PiTiktokLogoLight } from "react-icons/pi";
import { useMessages } from "@/hooks/useMessages";

function AddLinks() {
  const [showInputs, setShowInputs] = useState(false);
  const messages = useMessages();
  return (
    <div className="flex flex-col gap-2 w-full">
      <Button
        buttonType="outline"
        type="button"
        className="self-start px-4 py-2 w-45 text-sm text-[#ff6633]"
        onClick={() => setShowInputs(!showInputs)}
      >
        {showInputs ? messages.hide_links : messages.add_links}
      </Button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showInputs ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="grid grid-cols-1  md:grid-cols-2  gap-3">
          <Input
            type="text"
            placeholder="https://yourwebsite.ge"
            name="website"
            label="Website"
            icon={<BsGlobe className="text-[#949494]" />}
          />
          <Input
            type="text"
            placeholder="Facebook"
            name="facebook"
            label="Facebook"
            icon={<LuFacebook className="text-[#949494]" />}
          />
          <Input
            type="text"
            placeholder="Instagram"
            name="instagram"
            label="Instagram"
            icon={<FaInstagram className="text-[#949494]" />}
          />
          <Input
            type="text"
            placeholder="TikTok"
            name="tiktok"
            label="TikTok"
            icon={<PiTiktokLogoLight className="text-[#949494]" />}
          />
        </div>
      </div>
    </div>
  );
}

export default AddLinks;
