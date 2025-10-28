import { logout } from "@/lib/actions/logout";
import { MdLogout } from "react-icons/md";

function Logout() {
  return (
    <form action={logout}>
      <button
        className="cursor-pointer
       text-[#ef4343] w-full flex justify-start items-center transition-all gap-2 rounded-xl px-2 py-1
       font-semibold text-[16px] hover:bg-[#ffd466]"
      >
        <MdLogout />
        Log out
      </button>
    </form>
  );
}

export default Logout;
