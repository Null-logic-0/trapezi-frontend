import UserCard from "@/components/Profile/UserCard";
import ProfileNavMenu from "./ProfileNavMenu";
import Logout from "../Auth/Logout";
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

      <hr className="border-gray-300" />

      <Logout />
    </aside>
  );
}

export default ProfileAsideMenu;
