// Shows a modal with detailed information about an artist

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
};

export default function ArtistDetailsModal({ artist, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="modal max-w-lg w-full rounded-xl p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>

          {/* Image */}
          {artist.profilePic && (
            <Image
              src={artist.profilePic}
              alt={artist.name}
              width={300}
              height={300}
              className="rounded-md mx-auto mb-4 object-cover"
            />
          )}

          <h2 className="text-2xl font-bold text-center text-purple-700">{artist.name}</h2>
          <p className="text-sm text-center text-gray-500 dark:text-gray-300 mb-4">
            {artist.bio}
          </p>

          <ul className="space-y-2 text-sm text-gray-500 ">
            <li><strong className="text-purple-500">Location:</strong> {artist.location}</li>
            <li><strong className="text-purple-500">Categories:</strong> {artist.category?.join(", ")}</li>
            <li><strong className="text-purple-500">Languages:</strong> {artist.languages?.join(", ")}</li>
            <li><strong className="text-purple-500">Availability:</strong> {artist.availability?.join(", ")}</li>
            <li><strong className="text-purple-500">Fee Range:</strong> {artist.feeRange?.replace(/_/g, " ").replace("RANGE", "$")}</li>
            <li><strong className="text-purple-500">Rating:</strong> {artist.rating}<span className="text-yellow-500 text-lg">★</span></li>
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
