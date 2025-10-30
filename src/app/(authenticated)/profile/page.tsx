import MyBusiness from "@/components/Profile/MyBusiness";
import ProfileOverview from "@/components/Profile/ProfileOverview";
import Subscription from "@/components/Profile/Subscription";
import { fetchCurrentUser } from "@/lib/api/fetchCurrentUser";

async function Profile() {
  const user = await fetchCurrentUser();
  return (
    <div className="flex flex-col gap-6">
      <ProfileOverview
        isBusiness={user?.business_owner}
        avatar_url={user?.avatar_url || ""}
        name={user?.name || ""}
        last_name={user?.last_name || ""}
        email={user?.email || ""}
      />
      {user?.business_owner && (
        <>
          <MyBusiness />
          <Subscription />
        </>
      )}
    </div>
  );
}

export default Profile;
