import ForgotPassword from "@/components/Auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Forgot Password",
};

function ForgotPasswordPage() {
  return (
    <div className="h-screen mx-auto flex justify-center items-center">
      <ForgotPassword />
    </div>
  );
}

export default ForgotPasswordPage;
