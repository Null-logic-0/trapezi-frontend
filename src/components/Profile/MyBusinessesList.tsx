"use client";

import { useMessages } from "@/hooks/useMessages";
import Image from "next/image";
import Link from "next/link";

const businesses = [
  {
    id: 1,
    business_name: "Café Gabriadze",
    rating: 4.8,
    images_url: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    ],
  },
  {
    id: 2,
    business_name: "Shavi Lomi",
    rating: 4.9,
    images_url: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    ],
  },
  {
    id: 3,
    business_name: "Fabrika",
    rating: 4.7,
    images_url: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    ],
  },
  {
    id: 4,
    business_name: "Entrée Bakery",
    rating: 4.6,
    images_url: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    ],
  },
];

function MyBusinessesList() {
  const messages = useMessages();
  return (
    <ul className="flex flex-col gap-2 overflow-scroll h-[140px]">
      {businesses.length > 0 ? (
        businesses.map((business) => (
          <li
            key={business.id}
            className="flex justify-between items-center border-b pb-4 border-gray-400"
          >
            <Link
              href={`/places/${business.id}`}
              className="flex gap-2 items-center"
            >
              <Image
                src={business?.images_url[0]}
                alt={business?.business_name}
                width={60}
                height={60}
                unoptimized
                className="object-cover rounded-sm"
              />
              <p className="text-sm text-gray-700 font-semibold">
                {business?.business_name}
              </p>
            </Link>
            <p className="text-sm font-semibold text-gray-700">
              {business?.rating} ⭐️
            </p>
          </li>
        ))
      ) : (
        <div>
          <p className="text-center text-sm mt-6 font-semibold text-gray-400">
            {messages.no_business}
          </p>
        </div>
      )}
    </ul>
  );
}

export default MyBusinessesList;
