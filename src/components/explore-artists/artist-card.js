"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ArtistDetailsModal from "./artist-details-modal"; 

const Tilt = dynamic(() => import("react-parallax-tilt"), { ssr: false });

const ArtistCard = ({ artist }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        transitionSpeed={500}
        className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
      >
        {/* Image */}
        <div className="relative w-full h-64">
          <Image
            src={artist.profilePic || "/acrobat.jpg"}
            alt={artist.name || "alternative name"}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            aria-label="Popular Artists"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{artist.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{artist.bio?.slice(0, 100)}...</p>

          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <p><strong>Category:</strong> {artist.category?.join(", ")}</p>
            <p><strong>Location:</strong> {artist.location}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-purple-600 font-bold capitalize">
              {artist.feeRange?.replace(/_/g, " ").replace("RANGE", "$")}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-700 dark:text-white font-medium">
                {artist.rating}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ backgroundColor: "#7e22ce" }}
          onClick={() => setShowModal(true)}
          className="absolute top-2 right-2 cursor-pointer bg-purple-600 text-white px-3 py-1 rounded-lg font-semibold text-sm shadow-lg hover:scale-105 transition-transform"
        >
          Get a Quote
        </motion.button>
      </Tilt>

      {showModal && (
        <ArtistDetailsModal
          artist={artist}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ArtistCard;
