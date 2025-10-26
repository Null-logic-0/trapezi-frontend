"use client";

import OAuthButton from "./OAuthButton";

function OAuth() {
    return (
        <div className="mb-4 flex items-center max-md:flex-wrap gap-4">
            <OAuthButton provider="google" onClick={() => {
            }}/>
            <OAuthButton provider="meta" onClick={() => {
            }}/>
        </div>
    );
}

export default OAuth;
