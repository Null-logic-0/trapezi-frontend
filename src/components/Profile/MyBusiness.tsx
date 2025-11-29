"use client";
import { useMessages } from "@/hooks/useMessages";
import Button from "../UI/Button";
import ProfileHeading from "./ProfileHeading";
import { useRouter } from "next/navigation";
import MyBusinessesList from "./MyBusinessesList";
import { Card } from "../UI/Card";

function MyBusiness() {
  const messages = useMessages();
  const router = useRouter();
  return (
    <Card className="p-6">
      <div className="flex justify-between max-md:flex-col mb-6 mt-2 gap-2 items-center">
        <ProfileHeading title={messages.my_business} />

        <Button
          onClick={() => router.push("/add-new-place")}
          buttonType="outline"
          className="w-[180px] text-sm p-2"
        >
          {messages.add_business}
        </Button>
      </div>

      <MyBusinessesList />
    </Card>
  );
}

export default MyBusiness;
