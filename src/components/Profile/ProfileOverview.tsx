"use client";
import ProfileHeading from "./ProfileHeading";
import { FaRegUser } from "react-icons/fa6";
import UserMiniCard from "./UserMiniCard";
import { TfiWorld } from "react-icons/tfi";
import { MdOutlineEmail } from "react-icons/md";
import { LuCrown } from "react-icons/lu";
import Button from "../UI/Button";
import UpdateProfile from "./UpdateProfile";
import { useUIContext } from "@/store/ui-context";

type ProfileProps = {
  name: string;
  last_name: string;
  email: string;
  avatar_url: string;
};

function ProfileOverview({ name, last_name, email, avatar_url }: ProfileProps) {
  const { handleToggleModal } = useUIContext();
  const fullName = `${name} ${last_name}`;
  return (
    <>
      <div className="profile-card-container ">
        <div className="flex justify-between max-md:flex-col gap-2  mb-6 mt-2  items-center">
          <ProfileHeading title="Profile Overview" />

          <Button
            onClick={handleToggleModal}
            buttonType="outline"
            className="w-[100px] text-sm p-2"
          >
            Edit Profile
          </Button>
        </div>

        <div className="flex max-md:flex-col gap-4 max-md:items-start justify-between items-center">
          <div className="flex flex-col gap-4 items-start">
            <UserMiniCard text={fullName} icon={<FaRegUser />} label="Name" />

            <UserMiniCard
              label="Email"
              text={email}
              icon={<MdOutlineEmail />}
            />
          </div>

          <div className="flex flex-col gap-4 items-start">
            <UserMiniCard label="Plan" text="VIP" icon={<LuCrown />} />
            <UserMiniCard label="Language" text="English" icon={<TfiWorld />} />
          </div>
        </div>
      </div>
      <UpdateProfile
        name={name || ""}
        last_name={last_name || ""}
        avatar_url={avatar_url || ""}
      />
    </>
  );
}

export default ProfileOverview;
