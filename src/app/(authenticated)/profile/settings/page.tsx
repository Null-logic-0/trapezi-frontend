import DeleteAccount from "@/components/Profile/DeleteAccount";
import UpdatePassword from "@/components/Profile/UpdatePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Settings",
};

function SettingsPage() {
  return (
    <>
      <UpdatePassword />

      <div className="flex mt-6  justify-end w-full">
        <DeleteAccount />
      </div>
    </>
  );
}

export default SettingsPage;
