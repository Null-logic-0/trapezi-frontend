import { MdBusinessCenter } from "react-icons/md";

function UserCard() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <div className="bg-[#ff6933] flex justify-center items-center rounded-full h-20 w-20">
        <span className="text-white font-bold text-2xl">JD</span>
      </div>
      <div>
        <h3 className="text-center font-bold mb-2 text-xl">John Doe</h3>
        <p className="flex justify-center items-center font-bold text-sm rounded-full gap-1  w-full max-w-40 px-2 py-1 bg-[#ffd466]">
          <MdBusinessCenter className="text-lg" />
          Business Owner
        </p>
      </div>
    </div>
  );
}

export default UserCard;
