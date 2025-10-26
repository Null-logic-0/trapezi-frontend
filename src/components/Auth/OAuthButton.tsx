"use client";

import React from "react";

interface OAuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "meta";
  onClick?: () => void;
}

const providerStyles = {
  google: {
    bg: "bg-white hover:bg-gray-100",
    text: "text-gray-700",
    icon: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
        <path
          d="M533.5 278.4c0-17.5-1.5-35.3-4.7-52H272v98.7h146.9c-6.3 34.2-25 63.2-53.5 82.6v68h86.5c50.7-46.7 79.6-115.5 79.6-197.3z"
          fill="#4285F4"
        />
        <path
          d="M272 544.3c72.6 0 133.6-24 178-65.2l-86.5-68c-24.1 16.2-54.8 25.7-91.5 25.7-70.3 0-129.9-47.5-151.2-111.3H34.5v69.9C78.8 484 168 544.3 272 544.3z"
          fill="#34A853"
        />
        <path
          d="M120.8 328.5c-5.4-16-8.5-33-8.5-50.5s3.1-34.5 8.5-50.5v-69.9H34.5C12.3 182.4 0 228.7 0 278s12.3 95.6 34.5 138.4l86.3-68z"
          fill="#FBBC05"
        />
        <path
          d="M272 108.3c39.5 0 74.8 13.6 102.6 40.3l77-77C405.5 24 344.5 0 272 0 168 0 78.8 60.3 34.5 144.6l86.3 68c21.3-63.8 80.9-111.3 151.2-111.3z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  meta: {
    bg: "bg-[#1877F2] hover:bg-[#165ec9]",
    text: "text-white",
    icon: (
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.462.099 2.793.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.591l-.467 3.622h-3.124V24h6.127c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z" />
      </svg>
    ),
  },
};

const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  onClick,
  ...props
}) => {
  const style = providerStyles[provider];

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-full py-2 px-4 rounded-lg cursor-pointer font-semibold transition-all duration-200 ${style.bg} ${style.text} hover:shadow-md`}
      {...props}
    >
      {style.icon}
      {provider === "google" ? "Continue with Google" : "Continue with Meta"}
    </button>
  );
};

export default OAuthButton;
