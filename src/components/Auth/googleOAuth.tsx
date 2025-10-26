"use client"

import {
    CredentialResponse,
    GoogleLogin,
    GoogleOAuthProvider,
} from "@react-oauth/google";
import {useRef} from "react";
import {FaGoogle} from "react-icons/fa";
import Button from "@/components/UI/Button";
import {googleOAuth} from "@/lib/actions/googleOAuth";
import toast from "react-hot-toast";

const CLIENTID = process.env.NEXT_PUBLIC_CLIENT_ID || ""

function GoogleAuth() {
    const googleLoginRef = useRef<HTMLDivElement>(null);

    const handleGoogleResponse = async (response: CredentialResponse) => {
        if (!response.credential) return
        await googleOAuth(response.credential);

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
                        onError={() => {
                            toast.error("Login failed.");
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
            <Button
                type="button"
                buttonType="outline"
                className="border text-sm font-semibold "
                onClick={triggerGoogleLogin}>
                <FaGoogle className="text-xl text-[#ff6633]"/>
                Sign in with google
            </Button>
        </div>
    );
}

export default GoogleAuth;
