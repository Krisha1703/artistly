// Home Page Component

"use client";

import HeroSection from "./hero/hero";
import ArtistCategory from "./artist-categories/artist-category";
import Navbar from "./navbar/navbar";
import HowItWorksSection from "./how-it-works/how-it-works";
import ChatbotPopup from "@/components/chatbot-popup";

import dynamic from "next/dynamic";

const TestimonialSection = dynamic(() => import("./testimonials/testimonial-section"), { ssr: false });
const Footer = dynamic(() => import("./footer/footer"), { ssr: false });

export default function HomePage() {

  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ArtistCategory />
      <TestimonialSection />
      <ChatbotPopup />
      <Footer />
    </div>
  );
}
