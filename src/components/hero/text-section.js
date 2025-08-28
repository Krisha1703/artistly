"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load heavy components
const Heading = dynamic(() => import("../heading"), { suspense: true });
const Paragraph = dynamic(() => import("../paragraph"), { suspense: true });
const ActionButtons = dynamic(() => import("./action-buttons"), { suspense: true });

// Skeleton component
const TextSkeleton = () => (
  <div className="md:w-1/2 space-y-6">
    {/* Skeleton Heading */}
    <div className="h-12 md:h-16 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md "></div>

    {/* Skeleton Paragraph */}
    <div className="space-y-3">
      <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md "></div>
      <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded-md "></div>
      <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-700 rounded-md "></div>
    </div>

    {/* Skeleton Buttons */}
    <div className="flex gap-4 mt-4">
      <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md "></div>
      <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md "></div>
    </div>
  </div>
);

const TextSection = () => {
  return (
    <Suspense fallback={<TextSkeleton />}>
      <motion.div
        className="md:w-1/2 text-center md:text-left space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        variants={{
          hidden: {},
          visible: {},
        }}
      >
        <Heading 
          prefix="Find the" 
          focus="Perfect Artist" 
          suffix="for Any Occasion" 
        />

        <Paragraph
          parts={[
            { text: "Whether you're organizing a cozy private gathering or a full-scale festival, " },
            { text: "Artistly", highlight: true },
            { text: " connects you with talented performers across every genre and vibe. From DJs and dancers to speakers and singers — explore handpicked professionals ready to bring energy, emotion, and unforgettable moments to your stage." },
          ]}
        />

        <ActionButtons />
      </motion.div>
    </Suspense>
  )
}

export default React.memo(TextSection);
