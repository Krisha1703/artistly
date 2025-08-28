"use client";

import { useState, useEffect } from "react";
import Image from "next/image";


export default function GetQuoteForm({ onPrediction }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const maxSizeMB = 5;

  const handleFile = (file) => {
    if (!file) return;

    if (file.size / 1024 / 1024 > maxSizeMB) {
      alert(`File too large. Max size is ${maxSizeMB}MB.`);
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const getSuggestion = (eventClass) => {
    switch (eventClass.toLowerCase()) {
      case "birthday":
        return "🎉 Looks like you're celebrating a birthday! Let's make it unforgettable. We recommend our top party decorators, cake artists, and entertainers.";
      case "wedding":
        return "💍 A beautiful wedding! We have skilled photographers and elegant decor specialists to make your day magical.";
      case "school-function":
        return "🎓 It's a school function! We can help with stage setups, banners, and more.";
      case "pool-party":
        return "🏊‍♂️ Pool party vibes! Consider hiring our DJs, lifeguards, and pool decor experts.";
      default:
        return `✨ This looks like a ${eventClass}. Let's celebrate it together with our best artists and planners!`;
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict-event", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Prediction failed.");

      const data = await response.json();

      if (onPrediction) {
        onPrediction(data.event_class);
      }

      const suggestion = getSuggestion(data.event_class);
      setResult(`${suggestion}\n\nConfidence: ${data.confidence}`);
    } catch (error) {
      console.error(error);
      setResult("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleUpload(selectedFile);
    }
  }, [selectedFile]);

  return (
    <div className="flex flex-col items-center p-6 my-10 border-2 border-dashed border-purple-400 rounded-xl bg-purple-50 max-w-4xl mx-auto">
      <label className="text-center text-purple-700 font-semibold mb-4 text-lg">
        Upload or Drag & Drop an Event Image
      </label>

      <p className="text-xs text-center mb-2 text-gray-600">
        Suitable: Clear photos of event setups, parties, celebrations.
      </p>
      <p className="text-xs text-center mb-6 text-gray-500">
        Accepted: JPG, PNG, Max Size: 5MB
      </p>

      <div className="flex flex-col md:flex-row items-start gap-4 w-full">
        <div
          className={`flex-1 flex flex-col items-center justify-center px-4 py-8 h-64 bg-white rounded-lg shadow-md border-2 transition ${
            dragActive ? "border-purple-600 bg-purple-50" : "border-purple-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <svg
            className="w-10 h-10 text-purple-500 mb-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.94A4 4 0 0012 6h-.28A6 6 0 002 12a4 4 0 004 4h9a3 3 0 001.88-6.06zM12 11h-2v2H8v-2H6l4-4 4 4z" />
          </svg>
          <span className="text-sm text-purple-500 font-semibold mb-2">
            Drag & Drop or Click to Upload
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />

          <label
            htmlFor="fileInput"
            className="px-3 py-1 bg-purple-500 text-white rounded cursor-pointer text-sm"
          >
            Browse Files
          </label>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="flex-1 flex flex-col items-center justify-center h-64">
            <Image
              src={imagePreview}
              alt="Preview"
              width={250}
              height={250}
              className="w-full h-full object-cover rounded-md border-2 border-purple-400 shadow"
            />
            {loading && (
              <div className="mt-2 text-purple-600 font-semibold animate-pulse">
                🔍 Analyzing your image...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Result Text */}
      {result && !loading && (
        <div className="mt-6 w-full text-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  );
}
