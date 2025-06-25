// Hero Section with Artist Image Collage

"use client";

import ImageCollage from "./image-collage";
import TextSection from "./text-section";

export default function HeroSection() {
  return (
    <section className="hero-gradient flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16 w-full mx-auto bg-gradient-to-br from-purple-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-500">
      <TextSection />
      <ImageCollage />
    </section>
  );
}

