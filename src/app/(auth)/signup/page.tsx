import { Metadata } from "next";
import Signup from "@/components/Auth/Signup";
import AuthContainer from "@/components/Auth/AuthContainer";
import { fetchSettings } from "@/lib/api/fetchSettings";
import SignupRestrictMessage from "@/components/Auth/SignupRestrictMessage";

export const metadata: Metadata = {
  title: "Trapezi | Signup",
};

async function SignUpPage() {
  const settings = await fetchSettings("registration");

  const enabled = settings?.enabled === true || settings?.enabled === "true";

  if (!enabled) {
    return <SignupRestrictMessage />;
  }

  return (
    <AuthContainer>
      <Signup />
    </AuthContainer>
  );
}

export default SignUpPage;
