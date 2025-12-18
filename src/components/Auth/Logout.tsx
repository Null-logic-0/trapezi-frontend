"use client";

import { useState } from "react";
import { logout } from "@/lib/actions/logout";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMessages } from "@/hooks/useMessages";

export default function Logout() {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const messages = useMessages();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      const result = await logout();
      if (result.success) {
        router.push("/login");
        toast.success(messages.logout_message);
      }
    } catch (err) {
      console.error(err);
      toast.error(messages.error_message);
    } finally {
      setPending(false);
    }
  };
  return (
    <form onSubmit={handleLogout}>
      <button
        type="submit"
        disabled={pending}
        className={`cursor-pointer w-full flex justify-start items-center transition-all gap-2 rounded-xl px-2 py-1 font-semibold text-[16px]
          ${
            pending
              ? "bg-gray-200 text-gray-500"
              : "text-[#ef4343] hover:bg-[#ffd466]"
          }
        `}
      >
        <MdLogout />
        {pending ? messages.Logging_out : messages.logout}
      </button>
    </form>
  );
}
