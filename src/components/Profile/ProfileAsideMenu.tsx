import UserCard from "@/components/Profile/UserCard";
import ProfileNavMenu from "./ProfileNavMenu";
import Logout from "../Auth/Logout";
import { fetchCurrentUser } from "@/lib/api/fetchCurrentUser";
import { Card } from "../UI/Card";

async function ProfileAsideMenu() {
  const user = await fetchCurrentUser();

  return (
    <Card className="p-4  flex justify-evenly flex-col  gap-6 w-full h-full">
      <UserCard
        business_owner={user?.business_owner || false}
        name={user?.name || ""}
        last_name={user?.last_name || ""}
        avatar={user?.avatar_url || ""}
      />
      <ProfileNavMenu isBusinessAccount={user?.business_owner} />

      <hr className="border-gray-300" />

      <Logout />
    </Card>
  );
}

export default ProfileAsideMenu;
