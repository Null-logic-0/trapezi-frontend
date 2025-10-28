import Button from "../UI/Button";
import ProfileHeading from "./ProfileHeading";

function MyBusiness() {
  return (
    <div className="profile-card-container">
      <div className="flex justify-between max-md:flex-col mb-6 mt-2 gap-2 items-center">
        <ProfileHeading title="My Business" />

        <Button buttonType="outline" className="w-[150px] text-sm p-2">
          Add New Business
        </Button>
      </div>

      <div>
        <p className="text-center text-sm mt-6 font-semibold text-gray-400">
          You haven&apos;t added any businesses yet
        </p>
      </div>
    </div>
  );
}

export default MyBusiness;
