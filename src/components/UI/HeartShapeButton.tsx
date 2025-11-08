"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GoHeart, GoHeartFill } from "react-icons/go";

function HeartShapeButton() {
  const [favorite, setFavorite] = useState(false);

  const handleToggleLike = () => {
    setFavorite((prev) => !prev);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={handleToggleLike}
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
