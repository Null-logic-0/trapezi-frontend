"use client";

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Button from "@/components/UI/Button";
import { googleOAuth } from "@/lib/actions/googleOAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMessages } from "@/hooks/useMessages";

const CLIENTID = process.env.NEXT_PUBLIC_CLIENT_ID || "";

function GoogleAuth() {
  const router = useRouter();
  const googleLoginRef = useRef<HTMLDivElement>(null);
  const [isPending, setIsPending] = useState(false);

  const messages = useMessages();

  const handleGoogleResponse = async (response: CredentialResponse) => {
    if (!response.credential) return;
    try {
      setIsPending(true);
      const result = await googleOAuth(response.credential);

      if (result.success) {
        router.push("/profile");
        toast.success(messages.login_success);
      } else {
        toast.error(result.message || messages.login_error);
      }
    } catch (err) {
      console.error(err);
      toast.error(messages.error_message);
    } finally {
      setIsPending(false);
    }
  };

  const triggerGoogleLogin = () => {
    const button = googleLoginRef.current?.querySelector(
      "div[role=button]"
    ) as HTMLElement;
    button?.click();
  };

  return (
    <div className="flex justify-center items-center ">
      <div hidden ref={googleLoginRef}>
        <GoogleOAuthProvider clientId={CLIENTID}>
          <GoogleLogin
            size="large"
            shape="square"
            onSuccess={handleGoogleResponse}
            onError={() => toast.error(messages.login_error)}
          />
        </GoogleOAuthProvider>
      </div>
      <Button
        type="button"
        isDisabled={isPending}
        isPending={isPending}
        buttonType="outline"
        className={`border text-sm font-semibold ${
          isPending ? "bg-[#FFD166]" : undefined
        } `}
        onClick={triggerGoogleLogin}
      >
        <FaGoogle className="text-xl text-[#ff6633]" />
        {isPending ? messages.logging : messages.google}
      </Button>
    </div>
  );
}

export default GoogleAuth;
