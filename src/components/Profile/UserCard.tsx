import { MdBusinessCenter } from "react-icons/md";
import Image from "next/image";

type UserProps = {
  name: string;
  last_name: string;
  avatar?: string;
  business_owner: boolean;
};

function UserCard({ name, last_name, avatar, business_owner }: UserProps) {
  const initials = `${name?.[0] ?? ""}${last_name?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {avatar ? (
        <Image
          src={avatar}
          width={80}
          height={80}
          loading="lazy"
          alt="User profile image"
          className="rounded-full object-cover h-20 w-20"
        />
      ) : (
        <div className="bg-[#ff6933] flex justify-center items-center rounded-full h-20 w-20">
          <span className="text-white font-bold text-2xl">{initials}</span>
        </div>
      )}

      <div>
        <h3 className="text-center font-bold mb-2 text-xl">
          {name} {last_name}
        </h3>
        {business_owner && (
          <p className="flex justify-center items-center font-bold text-sm rounded-full gap-1  w-full max-w-40 px-2 py-1 bg-[#ffd466]">
            <MdBusinessCenter className="text-lg" />
            Business Owner
          </p>
        )}
      </div>
    </div>
  );
}

export default UserCard;
