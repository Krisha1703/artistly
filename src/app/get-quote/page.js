"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dynamic from "next/dynamic";
import { loadStripe } from '@stripe/stripe-js';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Dynamically imported components
const Navbar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });

// Utility to expand Weekdays/Weekends/full day list
const getAllowedDays = (availability) => {
  let days = new Set();

  availability.forEach(slot => {
    const slotLower = slot.toLowerCase();
    if (slotLower === "weekdays") {
      ["Monday","Tuesday","Wednesday","Thursday","Friday"].forEach(day => days.add(day));
    } else if (slotLower === "weekends") {
      ["Saturday","Sunday"].forEach(day => days.add(day));
    } else if (["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].includes(slotLower)) {
      days.add(slot.charAt(0).toUpperCase() + slot.slice(1).toLowerCase());
    }
  });

  return Array.from(days);
};

export default function GetQuotePage() {
  const searchParams = useSearchParams();

  const artistName = searchParams.get("name");
  const availability = JSON.parse(searchParams.get("availability") || "[]");
  const feeRange = searchParams.get("feeRange");
  const location = searchParams.get("location");
  const category = searchParams.get("category");

  const allowedDays = getAllowedDays(availability);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [quotation, setQuotation] = useState(null);

  const isDayAllowed = (dateObj) => {
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    return allowedDays.includes(dayName);
  };

  const isTimeAllowed = (timeObj) => {
    const hour = timeObj.getHours();

    const normalized = availability.map(s => s.toLowerCase());

    if (normalized.includes("morning") || normalized.includes("mornings")) {
      if (hour >= 6 && hour < 12) return true;
    }

    if (normalized.includes("afternoon") || normalized.includes("afternoons")) {
      if (hour >= 12 && hour < 17) return true;
    }

    if (normalized.includes("evening") || normalized.includes("evenings")) {
      if (hour >= 17 && hour < 22) return true;
    }

    const hasOnlyDays = normalized.every(slot =>
      ["monday","tuesday","wednesday","thursday","friday","saturday","sunday","weekdays","weekends"]
        .includes(slot)
    );
    if (hasOnlyDays) {
      return true;
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time) {
      alert("Please select both date and time");
      return;
    }

    if (!isDayAllowed(date)) {
      alert(`❌ This artist is available only on: ${allowedDays.join(", ")}`);
      return;
    }

    if (!isTimeAllowed(time)) {
      alert(`❌ This artist is not available at that time. Allowed slots: ${availability.join(", ")}`);
      return;
    }

    const baseFee = feeRange === "$500-$1,000" ? 500
      : feeRange === "$1,000-$2,000" ? 1000
      : feeRange === "$2,000-$5,000" ? 2000
      : feeRange === "$5,000+" ? 5000
      : 1000; // fallback

    const guestFactor = parseInt(guests) > 50 ? 1.5 : 1;
    const estimated = baseFee * guestFactor;

    setQuotation({
      date: date.toLocaleDateString(),
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      eventType,
      guests,
      estimated,
    });
  };

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const handleBookNow = async () => {
  const stripe = await stripePromise;

  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      artistName,
      eventType: quotation.eventType,
      amount: quotation.estimated, 
      date: quotation.date,
      time: quotation.time,
      eventType,
      location: "India",
      guests: quotation.guests,
      userId: "user123"
    }),
  });

  const data = await response.json();

  if (data.url) {
    // Redirect to Stripe Checkout
    window.location.href = data.url;
  } else {
    alert('Something went wrong!');
  }
};

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-8 modal rounded-xl shadow-lg border border-purple-200 my-5">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
          Get a Quote for <span className="underline decoration-purple-500">{artistName}</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 quote-modal">
          <div className="flex items-center space-x-2">
            <LocationOnIcon className="w-6 h-6 text-purple-600" />
            <p><strong>Location:</strong><span className="mx-2">{location}</span> </p>
          </div>
          <div className="flex items-center space-x-2">
            <LabelIcon className="w-6 h-6 text-purple-600" />
            <p><strong>Categories:</strong> <span className="mx-2">{category}</span> </p>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarTodayIcon className="w-6 h-6 text-purple-600" />
            <p><strong>Availability:</strong> <span className="mx-2">{availability.join(", ")}</span></p>
          </div>
          <div className="flex items-center space-x-2">
            <GroupIcon className="w-6 h-6 text-purple-600" />
            <p><strong>Fee Range:</strong> <span className="mx-2">{feeRange}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className=" mb-2 font-semibold quote-modal flex items-center gap-1">
                <CalendarTodayIcon className="w-5 h-5 text-purple-500" /> Event Date
              </label>
              <DatePicker
                selected={date}
                onChange={(val) => setDate(val)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                filterDate={(d) => isDayAllowed(d)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Allowed days: {allowedDays.join(", ")}</p>
            </div>

            <div>
              <label className=" mb-2 font-semibold quote-modal flex items-center gap-1">
                <AccessTimeIcon className="w-5 h-5 text-purple-500" /> Event Time
              </label>
              <DatePicker
                selected={time}
                onChange={(val) => setTime(val)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                placeholderText="Select a time"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Time slots: Morning (6–12), Afternoon (12–17), Evening (17–22)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold quote-modal">Event Type</label>
              <input
                type="text"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                placeholder="Wedding, Birthday, etc."
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold quote-modal">Number of Guests</label>
              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                placeholder="e.g. 50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-800 transition"
          >
            Get Quotation
          </button>
        </form>

        {quotation && (
          <div className="mt-10 bg-purple-50 border border-purple-300 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold mb-4 text-purple-700 text-center">
              Quotation Result
            </h2>
            <div className="space-y-3 text-gray-800 text-lg max-w-md mx-auto">
              <p><strong>Date:</strong> {quotation.date}</p>
              <p><strong>Time:</strong> {quotation.time}</p>
              <p><strong>Event Type:</strong> {quotation.eventType}</p>
              <p><strong>Guests:</strong> {quotation.guests}</p>
              <p><strong>Estimated Fee:</strong> <span className="text-green-700 font-bold">${quotation.estimated.toLocaleString()}</span></p>
            </div>
            <button
              onClick={handleBookNow}
              className="mt-6 block mx-auto bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Book Now
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
