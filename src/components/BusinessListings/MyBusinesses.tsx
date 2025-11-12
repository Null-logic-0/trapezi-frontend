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
  const {
    loading,
    error,
    places,
    removeBusiness,
    paginate,
    setPage,
    setSearchTerm,
  } = useFetchMyPlaces();
  const { handleToggleModal } = useUIContext();
  const [placeId, setPlaceId] = useState<number | undefined>();
  const messages = useMessages();
  const router = useRouter();

  return (
    <>
      {/* Hero Section */}
      <div className="pb-12 text-center bg-[#2A2D34]">
        <h1 className="text-4xl font-bold pt-26 pb-4 text-[#ff6633]">
          {messages.my_business}
        </h1>
        <p className="text-lg opacity-90 mb-8 text-white">
          {messages.manage_businesses}
        </p>
        <SearchBar
          onChange={(e) => setSearchTerm(e.target.value)}
          hasButton={false}
        />
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
        {!loading && !error && places.length === 0 && (
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
        {!loading && !error && places.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 py-12 lg:grid-cols-3 gap-6">
            {places.map((business, index) => (
              <div
                key={business.id}
                className="animate-fade-in relative"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <DropdownMenu
                  align="right"
                  className="z-20"
                  buttonStyles="rounded-md mb-2 shadow-sm bg-[#2A2D34] text-white text-lg p-2 hover:bg-[#FF6B35] transition-colors"
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
                    rating={business.average_rating}
                    isOpen={true}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && places.length > 0 && (
          <Pagination
            className="justify-self-center"
            currentPage={paginate?.current_page || 1}
            pagesCount={paginate?.total_count || 0}
            itemsPerPage={paginate?.per_page || 10}
            onPageChange={(p) => setPage(p)}
          />
        )}
      </div>
      <DeleteMyBusiness
        id={placeId}
        onDeleted={() => removeBusiness(placeId)}
      />
    </>
  );
}
