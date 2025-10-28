import Button from "../UI/Button";
import Input from "../UI/Input";
import ProfileHeading from "./ProfileHeading";

function UpdatePassword() {
  return (
    <div className="profile-card-container">
      <ProfileHeading title="Update Password" />
      <form className="flex mt-4 flex-col gap-4">
        <Input isPassword label="Current Password" name="current_password" />
        <Input isPassword label="New Password" name="password" />
        <Input
          isPassword
          label="Confirm Password"
          name="password_confirmation"
        />

        <Button type="submit">Update password</Button>
      </form>
    </div>
  );
}

export default UpdatePassword;
