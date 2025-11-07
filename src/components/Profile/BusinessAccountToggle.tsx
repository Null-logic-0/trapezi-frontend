"use client";
import { useMessages } from "@/hooks/useMessages";
import { useState } from "react";

interface BusinessAccountToggleProps {
  isBusiness?: boolean;
}

function BusinessAccountToggle({
  isBusiness = false,
}: BusinessAccountToggleProps) {
  const [businessAccount, setBusinessAccount] = useState(isBusiness);
  const messages = useMessages();

  return (
    <div className="flex items-center gap-3 mt-2">
      <label
        htmlFor="businessAccount"
        className="flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="businessAccount"
          value="1"
          name="business_owner"
          checked={businessAccount}
          onChange={() => setBusinessAccount((prev) => !prev)}
          className="sr-only"
        />
        <input type="hidden" name="business_owner" value="0" />

        <div
          className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
            businessAccount ? "bg-gray-400" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-[#ff6933] rounded-full shadow-xl transform transition-transform duration-300 ${
              businessAccount ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
      </label>
      <span className="text-sm font-medium text-gray-700">
        {messages.business_account}
      </span>
    </div>
  );
}

export default BusinessAccountToggle;
