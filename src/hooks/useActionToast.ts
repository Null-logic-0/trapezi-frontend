"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ActionState {
  success?: boolean;
  message?: string;
}

export function useActionToast(state: ActionState, redirectPath?: string) {
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        if (redirectPath) {
          router.push(redirectPath);
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state.message, state.success, redirectPath, router]);
}
