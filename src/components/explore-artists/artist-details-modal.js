// Artist details modal

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LocationOnIcon, CategoryIcon, LanguageIcon, CalendarMonthIcon, AttachMoneyIcon, StarIcon } from "@/data/artists";
import {DetailItem} from "./artist-details";
import useUserStore from "@/app/state/store";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.1 } },
};


export default function ArtistDetailsModal({ artist, onClose }) {

   const { role } = useUserStore();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-hidden"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="modal-details max-w-xl w-full rounded-xl p-6 relative shadow-2xl max-h-[92vh] border border-purple-500/20"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>

          {/* Artist Photo */}
          {artist.profilePic && (
            <Image
              src={artist.profilePic}
              alt={artist.name}
              width={200}
              height={200}
              className="rounded-md rounded-tr-2xl rounded-bl-2xl hover:border-4 hover:scale-105 hover:cursor-pointer transition-transform duration-300 mx-auto mb-4 border-2 border-purple-500 object-cover"
            />
          )}

          {/* Name & Bio */}
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-1">
            {artist.name}
          </h2>
          <p className="text-center  mb-6 italic">
            {artist.bio}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem icon={<LocationOnIcon className="text-purple-500" />} label="Location" value={artist.location} />
            <DetailItem icon={<CategoryIcon className="text-purple-500" />} label="Categories" value={artist.category?.join(", ")} />
            <DetailItem icon={<LanguageIcon className="text-purple-500" />} label="Languages" value={artist.languages?.join(", ")} />
            <DetailItem icon={<CalendarMonthIcon className="text-purple-500" />} label="Availability" value={artist.availability?.join(", ")} />
            <DetailItem icon={<AttachMoneyIcon className="text-purple-500" />} label="Fee Range" value={artist.feeRange?.replace(/_/g, " ").replace("RANGE", "$")} />
            <DetailItem icon={<StarIcon className="text-purple-500" />} label="Rating" value={`${artist.rating} ★`} />
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            {role ? (
              <Link 
                href={{
                  pathname: "/get-quote",
                  query: {
                    name: artist.name,
                    availability: JSON.stringify(artist.availability),
                    feeRange: artist.feeRange,
                    location: artist.location,
                    category: artist.category?.join(", "),
                  },
                }}
                passHref
              >
                <motion.p
                  whileHover={{ scale: 1.05 }}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-2 cursor-pointer rounded-lg shadow-md transition-all"
                >
                  Get a Quote
                </motion.p>
              </Link>
            ) : (
               <p className="font-semibold text-purple-800 pb-4">
                  Please login to get artist quotation
              </p>
            )}
          </div>
          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



