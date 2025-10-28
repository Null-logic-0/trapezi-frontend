import MyBusiness from "@/components/Profile/MyBusiness";
import ProfileOverview from "@/components/Profile/ProfileOverview";
import Subscription from "@/components/Profile/Subscription";

function Profile() {
  return (
    <div className="flex flex-col gap-6">
      <ProfileOverview />
      <MyBusiness />
      <Subscription />
    </div>
  );
}

export default Profile;
