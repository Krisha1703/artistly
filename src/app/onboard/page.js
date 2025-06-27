"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import useUserStore from "@/app/state/store";

// Dynamically import major components
const Navbar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false });
const OnboardArtists = dynamic(() => import("@/components/onboard-artists/artist-onboarding-form"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });

const Onboard = () => {
  const { role } = useUserStore();

  return (
    <>
      <Navbar />

      {role === "manager" ? (
        <OnboardArtists />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="max-w-xl mx-auto my-20 p-8 rounded-xl bg-purple-100 text-center shadow-lg border border-purple-300"
        >
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Restricted Access 🚫
          </h2>
          <p className="text-lg text-gray-700">
            Only <strong>managers</strong> can access the artist onboarding form.
          </p>
          <p className="mt-2 text-gray-600">
            Please login using a manager account to continue.
          </p>
        </motion.div>
      )}

      <Footer />
    </>
  );
};

export default memo(Onboard);
