import React from "react";

import AuthContainer from "@/components/Auth/AuthContainer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContainer>
      <div>{children}</div>
    </AuthContainer>
  );
}
