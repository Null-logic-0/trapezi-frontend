import { Card, CardContent } from "../UI/Card";
import { LuMapPin } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { BsGlobe2 } from "react-icons/bs";
import { LuFacebook } from "react-icons/lu";
import { GrInstagram } from "react-icons/gr";
import { PiTiktokLogoBold } from "react-icons/pi";
import { useFetchSinglePlace } from "@/hooks/useFetchSinglePlace";
import { useMessages } from "@/hooks/useMessages";

function BusinessInfo({ id }: { id: number }) {
  const { business } = useFetchSinglePlace(id);
  const messages = useMessages();
  const workingDays =
    business?.working_schedule_readable?.split(", ").map((entry) => {
      const [day, hours] = entry.split(": ");
      return { day, hours };
    }) || [];

  return (
    <Card className="bg-[#ffffff] border-[#e6e6e6]">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{messages.contact_info}</h3>

        <div className="flex items-baseline space-x-3">
          <LuMapPin className="text-[#ff6633]" />
          <div>
            <p className="font-medium ">{messages.address}</p>
            <p className="text-sm font-semibold text-[#868686]">
              {business?.address}
            </p>
          </div>
        </div>

        {workingDays.length > 0 && (
          <div className="flex items-start space-x-3">
            <FaRegClock className="text-[#ff6633]" />
            <div className="w-full">
              <p className="font-medium text-sm mb-2">
                {messages.working_hours}
              </p>
              <div className="space-y-1">
                {workingDays.map((day) => (
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
        )}

        {business?.phone && (
          <div className="flex items-start space-x-3">
            <FiPhone className="text-[#ff6633]" />
            <div>
              <p className="font-medium">{messages.phone}</p>
              <a
                href={`tel:${business?.phone}`}
                className="text-sm font-semibold text-[#868686] hover:underline"
              >
                {business?.phone}
              </a>
            </div>
          </div>
        )}

        {business?.website && (
          <div className="flex items-baseline space-x-3">
            <BsGlobe2 className="text-[#ff6633]" />
            <div>
              <p className="font-medium">{messages.website}</p>
              <a
                target="_blank"
                href={business.website}
                className="text-sm text-[#868686] font-semibold hover:underline"
              >
                {business.website}
              </a>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-400 ">
          <div className="flex gap-3">
            {business?.instagram && (
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 text-xl rounded-full bg-[#ff6633]/10 text-[#ff6633] hover:bg-[#ff6633] hover:text-white transition-colors"
              >
                <GrInstagram />
              </a>
            )}
            {business?.facebook && (
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 text-xl rounded-full bg-[#ff6633]/10 text-[#ff6633] hover:bg-[#ff6633] hover:text-white transition-colors"
              >
                <LuFacebook />
              </a>
            )}
            {business?.tiktok && (
              <a
                href={business?.tiktok}
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
