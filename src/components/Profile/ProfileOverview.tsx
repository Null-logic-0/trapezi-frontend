"use client";
import ProfileHeading from "./ProfileHeading";
import { FaRegUser } from "react-icons/fa6";
import UserMiniCard from "./UserMiniCard";
import { TfiWorld } from "react-icons/tfi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";

import Button from "../UI/Button";
import UpdateProfile from "./UpdateProfile";
import { useUIContext } from "@/store/ui-context";
import { useMessages } from "@/hooks/useMessages";

type ProfileProps = {
  name: string;
  last_name: string;
  email: string;
  avatar_url: string;
};

function ProfileOverview({ name, last_name, email, avatar_url }: ProfileProps) {
  const { handleToggleModal } = useUIContext();
  const messages = useMessages();

  const fullName = `${name} ${last_name}`;

  return (
    <>
      <div className="profile-card-container ">
        <div className="flex justify-between max-md:flex-col gap-2  mb-6 mt-2  items-center">
          <ProfileHeading title={messages.profile_overview} />

          <Button
            onClick={handleToggleModal}
            buttonType="outline"
            className="max-w-[184px] text-sm p-2"
          >
            {messages.edit_profile}
          </Button>
        </div>

        <div className="flex max-md:flex-col gap-4 max-md:items-start justify-between items-center max-w-xl">
          <div className="flex flex-col gap-4 items-start">
            <UserMiniCard
              text={fullName}
              icon={<FaRegUser />}
              label={messages.name}
            />

            <UserMiniCard
              label={messages.email}
              text={email}
              icon={<MdOutlineEmail />}
            />
          </div>

          <div className="flex flex-col gap-4 items-start">
            <UserMiniCard
              label={messages.plan}
              text="PRO"
              icon={<FaCreditCard />}
            />
            <UserMiniCard
              label={messages.lang}
              text={messages.language}
              icon={<TfiWorld />}
            />
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
