"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const NotFoundPage = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 text-white px-6">
      {/* Main Illustration */}
      <div className="relative w-64 h-64 mb-8">
        <Image
          src="/404-artist.png" // your custom 404 illustration
          alt="Artist not found"
          fill
          className={`transition-transform duration-500 ${
            hovered ? "rotate-6 scale-105" : ""
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </div>

      {/* Title & Message */}
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Oops! The artist is not available.
      </h2>
      <p className="text-center text-purple-200 mb-8 max-w-md">
        Looks like the page or artist you’re looking for is taking a break.
        Don’t worry, we’ve got plenty of other amazing artists for you to
        explore.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          Go Home
        </button>
        <button
          onClick={() => router.push("/artists")}
          className="bg-purple-400 hover:bg-purple-500 transition-colors px-6 py-3 rounded-lg font-semibold shadow-lg text-purple-900"
        >
          Explore Artists
        </button>
      </div>

      {/* Optional subtle animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 bg-white rounded-full absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
