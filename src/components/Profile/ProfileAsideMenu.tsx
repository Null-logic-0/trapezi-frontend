import UserCard from "@/components/Profile/UserCard";
import ProfileNavMenu from "./ProfileNavMenu";
import Logout from "../Auth/Logout";
import { TfiWorld } from "react-icons/tfi";
import { fetchCurrentUser } from "@/lib/api/fetchCurrentUser";

async function ProfileAsideMenu() {
  const user = await fetchCurrentUser();

  return (
    <aside className="profile-card-container flex justify-evenly flex-col  gap-6 w-full h-full">
      <UserCard
        business_owner={user?.business_owner || false}
        name={user?.name || ""}
        last_name={user?.last_name || ""}
        avatar={user?.avatar_url || ""}
      />
      <ProfileNavMenu />

      <div className="flex flex-col gap-2">
        <hr className="border-gray-300" />
        <button
          className="cursor-pointer
       text-[#252525] flex justify-start items-center transition-all gap-2 rounded-xl px-2 py-1
       font-semibold text-[16px] hover:bg-[#ffd466]"
        >
          <TfiWorld />
          🇬🇧 English
        </button>
        <Logout />
      </div>
    </aside>
  );
}

export default ProfileAsideMenu;
