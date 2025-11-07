import DeleteAccount from "@/components/Profile/DeleteAccount";
import UpdatePassword from "@/components/Profile/UpdatePassword";

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
