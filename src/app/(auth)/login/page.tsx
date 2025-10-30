import { Metadata } from "next";
import Login from "@/components/Auth/Login";

export const metadata: Metadata = {
  title: "Trapezi | Login",
};

function LogInPage() {
  return <Login />;
}

export default LogInPage;
