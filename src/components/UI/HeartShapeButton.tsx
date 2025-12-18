"use client";

import { motion } from "framer-motion";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useFavorites } from "@/store/favorites-context";

function HeartShapeButton({ id }: { id: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);

  const handleClick = async () => {
    await toggleFavorite(id);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={handleClick}
      className="text-xl text-[#ff6633] cursor-pointer relative"
    >
      <motion.div
        key={favorite ? "filled" : "empty"}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
        }}
      >
        {favorite ? <GoHeartFill /> : <GoHeart />}
      </motion.div>
    </motion.button>
  );
}

export default HeartShapeButton;
