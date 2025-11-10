import { Card, CardContent } from "../UI/Card";
import Reviews from "./Reviews";

type Props = {
  id: number;
};

function ReviewsSection({ id }: Props) {
  return (
    <Card className="border-[#e5e5e5]  bg-[#ffffff]">
      <CardContent className="p-6">
        <Reviews id={id} />
      </CardContent>
    </Card>
  );
}

export default ReviewsSection;
