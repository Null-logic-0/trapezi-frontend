"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Button from "./UI/Button";
import { CATEGORIES } from "@/helpers/categories";
import { useMessages } from "@/hooks/useMessages";

const CategoryFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const [selected, setSelected] = useState(currentCategory);

  const messages = useMessages();
  const categories = CATEGORIES(messages);

  const handleSelect = (key: string) => {
    setSelected(key);

    const params = new URLSearchParams(searchParams);
    if (key === "all") {
      params.delete("category");
    } else {
      params.set("category", key);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setSelected(currentCategory);
  }, [currentCategory]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#ffffff] border-y border-[#e3e3e3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex max-md:flex-wrap items-center justify-center gap-3">
          {categories.map((category) => {
            const isSelected = selected === category.key;

            return (
              <Button
                key={category.key}
                buttonType={isSelected ? "fill" : "outline"}
                className="flex items-center gap-2 max-w-[150px] rounded-full text-sm transition-all"
                onClick={() => handleSelect(category.key)}
              >
                {category.icon}
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
