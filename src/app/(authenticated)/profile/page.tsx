import MyBusiness from "@/components/Profile/MyBusiness";
import ProfileOverview from "@/components/Profile/ProfileOverview";
import Subscription from "@/components/Profile/Subscription";
import Spinner from "@/components/UI/Spinner/Spinner";
import { fetchCurrentUser } from "@/lib/api/fetchCurrentUser";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const user = await fetchCurrentUser();

  return {
    title: `${user?.name} ${user?.last_name}`,
  };
}

async function Profile() {
  const user = await fetchCurrentUser();
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <div className="flex max-md:mt-16 flex-col gap-6">
        <ProfileOverview
          isBusiness={user?.business_owner}
          avatar_url={user?.avatar_url || ""}
          name={user?.name || ""}
          plan={user?.plan || ""}
          last_name={user?.last_name || ""}
          email={user?.email || ""}
        />
        {user?.business_owner && (
          <>
            <MyBusiness />
            {user?.plan === "free" && <Subscription />}
          </>
        )}
      </div>
    </Suspense>
  );
}

export default Profile;
