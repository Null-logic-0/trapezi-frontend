"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMessages } from "./useMessages";

interface ActionState {
  success?: boolean;
  message?: string;
}

export function useActionToast(
  state: ActionState,
  redirectPath?: string,
  message?: string
) {
  const router = useRouter();
  const messages = useMessages();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(messages.success_message);
        if (redirectPath) {
          router.push(redirectPath);
        }
      } else {
        toast.error(messages.error_message);
      }
    }
  }, [
    state.message,
    state.success,
    redirectPath,
    router,
    messages.error_message,
    message,
    messages.success_message,
  ]);
}
