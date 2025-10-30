import { Metadata } from "next";
import Signup from "@/components/Auth/Signup";

export const metadata: Metadata = {
  title: "Trapezi | Signup",
};

function SignUpPage() {
  return <Signup />;
}

export default SignUpPage;
