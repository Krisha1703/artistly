// Artist Image Collage with Interactive Animation

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useFetchArtists } from "../../../hooks/use-fetch-artist";

const ImageCollage = () => {
   const { allArtists } = useFetchArtists();
 // Tracks the user's vertical scroll progress
  const collageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"],
  });

  // Based on this progress, the following is applied, where 0 refers to the intial position and 1 to the final position of the scroll progress
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]); // scales the entire image collage slightly as user scrolls vertically
  const rotate = useTransform(scrollYProgress, [0, 1], ["-3deg", "0deg"]); // rotates the entire image collage slightly as user scrolls vertically
 
  // Selects the most popular artists based on rating to display in hero section
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
            // Interactive motion effects applied to each image in the collage
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
}

export default ImageCollage