import { Metadata } from "next";
import Signup from "@/components/Auth/Signup";
import AuthContainer from "@/components/Auth/AuthContainer";

export const metadata: Metadata = {
  title: "Trapezi | Signup",
};

function SignUpPage() {
  return (
    <AuthContainer>
      <Signup />
    </AuthContainer>
  );
}

export default SignUpPage;
