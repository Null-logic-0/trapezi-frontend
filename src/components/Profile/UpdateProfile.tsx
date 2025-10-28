"use client";

import { useUIContext } from "@/store/ui-context";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import ImagePicker from "../UI/ImagePicker";

function UpdateProfile() {
  const { handleToggleModal } = useUIContext();
  return (
    <Modal>
      <form className="flex flex-col gap-4">
        <ImagePicker
          firstName="John"
          lastName="Doe"
          defaultImage=""
          name="avatar"
        />
        <Input type="text" label="Name" name="name" defaultValue={"John"} />
        <Input
          type="text"
          label="Last Name"
          name="last_name"
          defaultValue={"Doe"}
        />

        <div className="flex justify-center mt-6 items-center gap-4">
          <Button
            buttonType="outline"
            type="button"
            onClick={handleToggleModal}
          >
            Cancel
          </Button>

          <Button buttonType="fill" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateProfile;
