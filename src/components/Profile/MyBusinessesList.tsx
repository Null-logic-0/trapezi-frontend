"use client";

import { useFetchMyPlaces } from "@/hooks/useFetchMyPlaces";
import { useMessages } from "@/hooks/useMessages";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../UI/Spinner/Spinner";

function MyBusinessesList() {
  const messages = useMessages();
  const { loading, places, error } = useFetchMyPlaces();

  if (loading && !error)
    return (
      <div className="flex justify-center items-center animate-pulse ">
        <Spinner />
      </div>
    );

  if (error && !loading) {
    return (
      <p className="text-center text-sm mt-6 font-semibold text-red-500">
        Oops something went wrong
      </p>
    );
  }
  return (
    <ul className="flex flex-col gap-2 overflow-scroll h-[140px]">
      {places.length > 0 ? (
        places.slice(0, 5).map((business) => (
          <li
            key={business.id}
            className="flex justify-between items-center border-b pb-4 border-gray-400"
          >
            <Link
              href={`/places/${business.id}`}
              className="flex gap-2 items-center"
            >
              <div className="relative h-10 w-18">
                <Image
                  src={business?.images_url?.[0] || ""}
                  alt={business?.business_name}
                  fill
                  unoptimized
                  className="object-cover rounded-sm"
                />
              </div>
              <p className="text-sm text-gray-700 font-semibold">
                {business?.business_name}
              </p>
            </Link>
            <p className="text-sm font-semibold text-gray-700">
              {business?.average_rating?.toFixed(1)} ⭐️
            </p>
          </li>
        ))
      ) : (
        <p className="text-center text-sm mt-6 font-semibold text-gray-400">
          {messages.no_business}
        </p>
      )}
    </ul>
  );
}

export default MyBusinessesList;
