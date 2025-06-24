"use client"
import { memo } from "react";
import dynamic from "next/dynamic";;

// Dynamically imported components
const Navbar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false });
const ExploreArtists = dynamic(() => import("@/components/explore-artists/explore-artists"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });

const Explore = () => {
  return (
    <>
      <Navbar />
      <ExploreArtists />
      <Footer />
    </>
  );
};

export default memo(Explore);