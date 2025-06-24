"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Tilt = dynamic(() => import("react-parallax-tilt"), { ssr: false });

const ArtistCard = ({ artist }) => {
  const isIndividual = !!artist.location; // true if individual artist data

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      transitionSpeed={500}
      className="group bg-white rounded-lg shadow-lg overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-64">
        <Image
          src={artist.image || artist.src || ""}
          alt={artist.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{artist.name}</h3>
        <p className="text-sm text-gray-600">{artist.description}</p>

        {/* For Explore (individual artist view) */}
        {isIndividual && (
          <div className="text-sm text-gray-500 mt-2">
            <p><strong>Category:</strong> {artist.category}</p>
            <p><strong>Location:</strong> {artist.location}</p>
            <p className="mt-1"> {artist.bio}</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <span className="text-primary font-bold">
            {artist.fee || artist.price}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-gray-700 font-medium">
              {artist.rating}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <motion.button
        className="absolute top-2 right-2 cursor-pointer hover:bg-purple-500 text-white px-2 py-1 rounded-lg font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Get a Quote
      </motion.button>
    </Tilt>
  );
};

export default ArtistCard;
