import Button from "../UI/Button";
import { Card, CardContent } from "../UI/Card";
import { IoMdStar } from "react-icons/io";

function ReviewsSection() {
  return (
    <Card className="border-[#e5e5e5] bg-[#ffffff]">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((review) => (
            <div key={review} className="border-b pb-4 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-[16px]">John Doe</p>
                  <div className="flex items-center space-x-1 text-sm">
                    <IoMdStar className="text-[#ff6633] text-xl" />

                    <span className="text-sm font-semibold">5.0</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-[#666666]">
                  2 weeks ago
                </p>
              </div>
              <p className="text-[#666666] text-sm">
                Amazing food and great atmosphere! The khinkali was delicious.
              </p>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4" buttonType="outline">
          Write a Review
        </Button>
      </CardContent>
    </Card>
  );
}

export default ReviewsSection;
