// Custom Loading Component 

"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <motion.div
        className="w-16 h-16 border-[6px] border-purple-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="mt-6 text-lg font-semibold text-purple-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading Artistly...
      </motion.p>
    </div>
  );
}
