import { Card, CardContent } from "../UI/Card";
import { LuMapPin } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { BsGlobe2 } from "react-icons/bs";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { PiTiktokLogoBold } from "react-icons/pi";

type WorkingDay = {
  day: string;
  hours: string;
};

type SocialLinks = {
  instagram?: string;
  facebook?: string;
  twitter?: string;
};

type Business = {
  location: string;
  phone: string;
  website?: string;
  workingDays: WorkingDay[];
  social: SocialLinks;
};

type BusinessInfoProps = {
  business: Business;
};

function BusinessInfo({ business }: BusinessInfoProps) {
  return (
    <Card className="bg-[#ffffff] border-[#e6e6e6]">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-bold">Contact Information</h3>

        <div className="flex items-start space-x-3">
          <LuMapPin className="text-[#ff6633]" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-sm font-semibold text-[#868686]">
              {business.location}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <FaRegClock className="text-[#ff6633]" />
          <div className="w-full">
            <p className="font-medium text-sm mb-2">Working Hours</p>
            <div className="space-y-1">
              {business.workingDays.map((day) => (
                <div key={day.day} className="flex justify-between text-sm">
                  <span className="text-[#868686] text-sm font-semibold">
                    {day.day}
                  </span>
                  <span className="text-sm text-[#868686] font-semibold">
                    {day.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <FiPhone className="text-[#ff6633]" />
          <div>
            <p className="font-medium">Phone</p>
            <a
              href={`tel:${business.phone}`}
              className="text-sm font-semibold text-[#868686] hover:underline"
            >
              {business.phone}
            </a>
          </div>
        </div>

        <div className="flex items-baseline space-x-3">
          <BsGlobe2 className="text-[#ff6633]" />
          <div>
            <p className="font-medium">Website</p>
            <a
              target="_blank"
              href={business.website}
              className="text-sm text-[#868686] font-semibold hover:underline"
            >
              {business.website}
            </a>
          </div>
        </div>

        <div className="pt-2">
          <p className="font-medium mb-3">Social Media</p>
          <div className="flex gap-3">
            {business.social.instagram && (
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 text-xl rounded-full bg-[#ff6633]/10 text-[#ff6633] hover:bg-[#ff6633] hover:text-white transition-colors"
              >
                <GrInstagram />
              </a>
            )}
            {business.social.facebook && (
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 text-xl rounded-full bg-[#ff6633]/10 text-[#ff6633] hover:bg-[#ff6633] hover:text-white transition-colors"
              >
                <LuFacebook />
              </a>
            )}
            {business.social.twitter && (
              <a
                href={business.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 text-xl rounded-full bg-[#ff6633]/10 text-[#ff6633] hover:bg-[#ff6633] hover:text-white transition-colors"
              >
                <PiTiktokLogoBold />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BusinessInfo;
