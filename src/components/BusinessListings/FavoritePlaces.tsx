"use client";
import { useMessages } from "@/hooks/useMessages";
import SearchBar from "../UI/SearchBar";
import Pagination from "../UI/Pagination";
import Link from "next/link";
import BusinessCard from "./BusinessCard";
import Spinner from "../UI/Spinner/Spinner";
import CategoryFilter from "../CategoryFilter";
import { useFetchFavoritePlaces } from "@/hooks/useFetchFavoritePlaces";

function FavoritePlaces() {
  const messages = useMessages();
  const { loading, businesses, error } = useFetchFavoritePlaces();
  return (
    <>
      {/* Hero Section */}
      <div className="pb-12 text-center bg-[#2A2D34]">
        <h1 className="text-4xl font-bold pt-26 pb-4 text-[#ff6633]">
          {messages.favorites}
        </h1>
        <p className="text-lg opacity-90 mb-8 text-white">
          {messages.add_favorites}
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
          <p className="text-center text-gray-500 py-12 text-xl font-semibold">
            {messages.no_business}
          </p>
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
        {!loading && !error && businesses.length > 0 && (
          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        )}
      </div>
    </>
  );
}

export default FavoritePlaces;
