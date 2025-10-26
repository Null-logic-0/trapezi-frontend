import React from "react";
import Logo from "@/components/UI/Logo";
import AuthTabs from "@/components/Auth/AuthTabs";
import GoogleOAuth from "@/components/Auth/googleOAuth";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col px-2 py-4  items-center justify-center ">
            <div className="text-center my-4">
                <Logo/>
                <p className="text-gray-500 font-semibold text-lg">
                    Discover food places in Georgia
                </p>
            </div>
            <main
                className="bg-[#ffffff] border-3
            border-[#e5e5e5] rounded-xl p-4 max-w-lg w-full "
            >
                <div className="py-2">
                    <h2 className="text-2xl  font-bold">Welcome</h2>
                    <p className="text-gray-500 font-semibold   text-sm">
                        Sign in to your account or create a new one
                    </p>
                </div>

                <AuthTabs/>

                {children}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400 font-semibold">
              Or continue with
            </span>
                    </div>
                </div>

                <GoogleOAuth/>
            </main>
        </div>
    );
}
