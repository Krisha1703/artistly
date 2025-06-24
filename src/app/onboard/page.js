"use client"
import { memo } from "react";
import dynamic from "next/dynamic";;

// Dynamically imported components
const Navbar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false });
const OnboardArtists = dynamic(() => import("@/components/onboard-artists/artist-onboarding-form"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });

const Onboard = () => {
  return (
    <>
      <Navbar />
      <OnboardArtists />
      <Footer />
    </>
  );
};

export default memo(Onboard);