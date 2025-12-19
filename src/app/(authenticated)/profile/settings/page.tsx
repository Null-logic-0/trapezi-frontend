import DeleteAccount from "@/components/Profile/DeleteAccount";
import UpdatePassword from "@/components/Profile/UpdatePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trapezi | Settings",
};

function SettingsPage() {
  return (
    <div className="flex-col flex gap-6  w-full">
      <UpdatePassword />
      <div className="w-full flex justify-end">
        <DeleteAccount />
      </div>
    </div>
  );
}

export default SettingsPage;
