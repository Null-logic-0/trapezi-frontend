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
import { Card } from "../UI/Card";

type ProfileProps = {
  name: string;
  last_name: string;
  email: string;
  plan: string;
  avatar_url: string;
  isBusiness?: boolean;
};

function ProfileOverview({
  name,
  last_name,
  plan,
  email,
  avatar_url,
  isBusiness,
}: ProfileProps) {
  const { handleOpenModal } = useUIContext();
  const messages = useMessages();

  const fullName = `${name} ${last_name}`;

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between max-md:flex-col gap-2  mb-6 mt-2  items-center">
          <ProfileHeading title={messages.profile_overview} />

          <Button
            onClick={() => handleOpenModal("update-profile")}
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
              text={plan}
              icon={<FaCreditCard />}
            />
            <UserMiniCard
              label={messages.lang}
              text={messages.language}
              icon={<TfiWorld />}
            />
          </div>
        </div>
      </Card>
      <UpdateProfile
        isBusiness={isBusiness}
        name={name || ""}
        last_name={last_name || ""}
        avatar_url={avatar_url || ""}
      />
    </>
  );
}

export default ProfileOverview;
