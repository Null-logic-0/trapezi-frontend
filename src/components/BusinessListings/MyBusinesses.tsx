"use client";

import Link from "next/link";
import BusinessCard from "./BusinessCard";
import CategoryFilter from "../CategoryFilter";
import SearchBar from "../UI/SearchBar";
import Pagination from "../UI/Pagination";

import { useFetchMyPlaces } from "@/hooks/useFetchMyPlaces";
import Spinner from "../UI/Spinner/Spinner";
import DropdownMenu from "../UI/DropdownMenu";

import { RiEditFill } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteMyBusiness from "./DeleteMyBusiness";
import { useUIContext } from "@/store/ui-context";
import { useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";

export default function MyBusinesses() {
  const { loading, error, businesses, removeBusiness } = useFetchMyPlaces();
  const { handleToggleModal } = useUIContext();
  const [placeId, setPlaceId] = useState<number | undefined>();
  const messages = useMessages();
  const router = useRouter();

  return (
    <>
      {/* Hero Section */}
      <div className="pb-12 text-center bg-[#2A2D34]">
        <h1 className="text-5xl font-bold pt-26 pb-4 text-[#ff6633]">
          {messages.my_business}
        </h1>
        <p className="text-lg opacity-90 mb-8 text-white">
          {messages.manage_businesses}
        </p>
        <SearchBar />
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 w-full sm:px-6 lg:px-8">
        <CategoryFilter />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 ">
            <Spinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center py-12 font-semibold text-xl text-red-600">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && businesses.length === 0 && (
          <div className="flex flex-col items-center py-12 gap-6">
            <p className="text-center text-gray-500  text-xl font-semibold">
              {messages.no_business}
            </p>
            <Button
              onClick={() => router.push("/add-new-place")}
              buttonType="outline"
              className="w-[180px] text-sm p-2"
            >
              {messages.add_business}
            </Button>
          </div>
        )}

        {/* Business Grid */}
        {!loading && !error && businesses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 py-12 lg:grid-cols-3 gap-6">
            {businesses.map((business, index) => (
              <div
                key={business.id}
                className="animate-fade-in relative"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <DropdownMenu
                  align="right"
                  items={[
                    {
                      label: (
                        <p className="flex justify-between items-center">
                          {messages.edit}
                          <RiEditFill />
                        </p>
                      ),
                      onClick: () => router.push(`/edit-place/${business.id}`),
                    },
                    {
                      label: (
                        <p className="flex text-red-500 justify-between items-center">
                          {messages.delete}
                          <RiDeleteBinLine />
                        </p>
                      ),
                      onClick: () => {
                        handleToggleModal();
                        setPlaceId(business.id);
                      },
                    },
                  ]}
                />

                <Link href={`places/${business.id}`}>
                  <BusinessCard
                    business_name={business.business_name}
                    categories={business.categories}
                    address={business.address}
                    image={business.images_url?.[0] || ""}
                    rating={4.4}
                    reviews={20}
                    isOpen={true}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && businesses.length > 0 && (
          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        )}
      </div>
      <DeleteMyBusiness
        id={placeId}
        onDeleted={() => removeBusiness(placeId)}
      />
    </>
  );
}
