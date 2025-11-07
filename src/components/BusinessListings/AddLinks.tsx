"use client";

import { JSX, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";

import { BsGlobe } from "react-icons/bs";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { PiTiktokLogoLight } from "react-icons/pi";
import { useMessages } from "@/hooks/useMessages";

type LinkProps = {
  website?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
};

interface Links {
  defaultValues?: LinkProps;
}

const INPUTS: {
  key: keyof LinkProps;
  label: string;
  placeholder: string;
  icon: JSX.Element;
}[] = [
  {
    key: "website",
    label: "Website",
    placeholder: "https://yourwebsite.ge",
    icon: <BsGlobe className="text-[#949494]" />,
  },
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "Facebook",
    icon: <LuFacebook className="text-[#949494]" />,
  },
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "Instagram",
    icon: <FaInstagram className="text-[#949494]" />,
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "TikTok",
    icon: <PiTiktokLogoLight className="text-[#949494]" />,
  },
];

function AddLinks({ defaultValues }: Links) {
  const hasAnyValue = defaultValues
    ? Object.values(defaultValues).some(
        (val) => val && String(val).trim() !== ""
      )
    : false;

  const [showInputs, setShowInputs] = useState(hasAnyValue);
  const messages = useMessages();

  return (
    <div className="flex flex-col gap-2 w-full">
      {!showInputs && (
        <Button
          buttonType="outline"
          type="button"
          className="self-start px-4 py-2 w-45 text-sm text-[#ff6633]"
          onClick={() => setShowInputs(true)}
        >
          {messages.add_links}
        </Button>
      )}

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showInputs ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {INPUTS.map(({ key, label, placeholder, icon }) => (
            <Input
              key={key}
              type="text"
              name={key}
              label={label}
              placeholder={placeholder}
              defaultValue={defaultValues?.[key]}
              icon={icon}
              className="text-gray-600 font-semibold"
            />
          ))}
        </div>

        {showInputs && (
          <Button
            buttonType="outline"
            type="button"
            className="self-start mt-2 px-4 py-2 w-45 text-sm text-[#ff6633]"
            onClick={() => setShowInputs(false)}
          >
            {messages.hide_links}
          </Button>
        )}
      </div>
    </div>
  );
}

export default AddLinks;
