// Hero Section with Artist Image Collage

"use client";
import dynamic from "next/dynamic";
import TextSection from "./text-section";

const ImageCollage = dynamic(() => import('./image-collage'), {
  ssr: false,
  suspense: true,
});


export default function HeroSection() {
  return (
    <section className="hero-gradient flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 w-full mx-auto bg-gradient-to-br from-purple-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-500">
      <TextSection />
      <ImageCollage />
    </section>
  );
}

