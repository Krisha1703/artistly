// Home Page Component

"use client";

import HeroSection from "./hero/hero";
import HowItWorksSection from "./how-it-works/how-it-works";
import ArtistCategory from "./artist-categories/artist-category";
import TestimonialSection from "./testimonials/testimonial-section";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";


export default function HomePage() {

  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ArtistCategory />
      <TestimonialSection />
      <Footer />
    </div>
  );
}
