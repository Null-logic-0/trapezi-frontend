import { Metadata } from "next";
import Login from "@/components/Auth/Login";
import AuthContainer from "@/components/Auth/AuthContainer";

export const metadata: Metadata = {
  title: "Trapezi | Login",
};

function LogInPage() {
  return (
    <AuthContainer>
      <Login />
    </AuthContainer>
  );
}

export default LogInPage;
