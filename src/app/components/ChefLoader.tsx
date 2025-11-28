"use client";

import { motion } from "framer-motion";

function ChefLoader() {
  const brandColor = "#FF6B35";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-50">
      <div className="relative flex flex-col items-center justify-center mb-8">
        <div className="absolute -top-12 flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-full opacity-60"
              style={{ backgroundColor: brandColor, width: 12, height: 12 }}
              animate={{
                y: [0, -30, -50],
                x: [0, i % 2 === 0 ? 5 : -5, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 1.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            animate={{
              rotate: [0, -2, 2, -1, 1, 0],
              y: [0, 2, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <path
              d="M15 45H5V60H15"
              stroke={brandColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M85 45H95V60H85"
              stroke={brandColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pot Body */}
            <path
              d="M20 40H80V75C80 86.0457 71.0457 95 60 95H40C28.9543 95 20 86.0457 20 75V40Z"
              fill="white"
              stroke={brandColor}
              strokeWidth="5"
            />
          </motion.g>

          <motion.path
            d="M25 40H75C75 30 65 25 50 25C35 25 25 30 25 40Z"
            fill="white"
            stroke={brandColor}
            strokeWidth="5"
            strokeLinejoin="round"
            animate={{
              y: [0, -8, 0],
              rotate: [0, -1, 1, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeOut",
            }}
          />

          <motion.rect
            x="45"
            y="20"
            width="10"
            height="6"
            rx="2"
            fill={brandColor}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeOut",
            }}
          />
        </svg>
      </div>

      <motion.h2
        className="text-2xl font-bold tracking-widest uppercase mb-4"
        style={{ color: brandColor }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Coming Soon...
      </motion.h2>

      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full absolute left-0 top-0"
          style={{ backgroundColor: brandColor }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}

export default ChefLoader;
