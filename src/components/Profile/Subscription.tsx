import Button from "../UI/Button";
import ProfileHeading from "./ProfileHeading";
import { LuCrown } from "react-icons/lu";

function Subscription() {
  return (
    <div className="profile-card-container ">
      <div className="mb-6 mt-2 max-md:text-center">
        <ProfileHeading title="Subscription" />
      </div>

      <div className="border border-[#e8e8e8] flex justify-between w-full max-md:flex-col gap-4 items-center rounded-xl p-4">
        <div className="flex items-center max-md:flex-col gap-2">
          <div className="bg-[#ffd466] text-2xl rounded-lg h-14 w-14 flex justify-center items-center">
            <LuCrown />
          </div>

          <div>
            <p className="text-lg max-md:text-center font-bold">VIP Plan</p>
            <span className="text-gray-400 text-sm font-semibold max-md:text-center">
              Premium visibility and features
            </span>
          </div>
        </div>
        <Button
          buttonType="outline"
          className="w-[120px] max-md:w-full text-sm p-2"
        >
          Manage Plan
        </Button>
      </div>
    </div>
  );
}

export default Subscription;
