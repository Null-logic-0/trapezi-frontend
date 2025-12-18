"use client";

import { toggleFavoritePlaces } from "@/lib/api/toggleFavoritePlaces";
import { createContext, use, useState, ReactNode } from "react";

type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = async (id: number) => {
    try {
      // Optimistic UI update
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      );

      const response = await toggleFavoritePlaces(id);

      if (response?.success && response.favorite === false) {
        setFavorites((prev) => prev.filter((fid) => fid !== id));
      } else if (response?.success && response.favorite === true) {
        setFavorites((prev) => [...new Set([...prev, id])]);
      }
    } catch (err) {
      console.error("Toggle favorite error:", err);
    }
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext>
  );
};

export const useFavorites = () => {
  const context = use(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
