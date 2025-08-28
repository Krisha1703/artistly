// Artist Image Collage with Interactive Animation + Skeleton Loader

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { useFetchArtists } from "../../../hooks/use-fetch-artist";

const SkeletonCollage = () => {
  return (
    <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-lg shadow-lg overflow-hidden"
          >
            <div className="w-[350px] h-[120px] border-2 border-gray-300 rounded-lg animate-pulse" />

          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ImageCollage = () => {
  const { allArtists, isLoading, isError } = useFetchArtists();

  // Tracks the user's vertical scroll progress
  const collageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], ["-3deg", "0deg"]);

  if (isLoading) {
    return <SkeletonCollage />;
  }

  if (isError || !allArtists?.length) {
    return <SkeletonCollage />; // keep same layout even on error/empty
  }

  // Selects the most popular artists based on rating
  const topArtists = [...allArtists]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 9);

  return (
    <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center">
      <motion.div
        ref={collageRef}
        style={{ scale, rotate }}
        className="grid grid-cols-3 gap-4"
      >
        {topArtists.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, rotate: "2deg" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.01 }}
            className="rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            <Image
              src={img.profilePic}
              alt={img.name}
              width={350}
              height={250}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default React.memo(ImageCollage);
