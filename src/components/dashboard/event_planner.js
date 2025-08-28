"use client";

import { useState } from "react";
import useUserStore from "@/app/state/store";
import MyBookingsTable from "./mybookings";
import DefaultButton from "../button/default-button";
import HoverButton from "../button/hover-button";
import BrushIcon from "@mui/icons-material/Brush";
import EventAvailable from "@mui/icons-material/EventAvailable";

export default function EventPlannerDashboard() {
  const { firstName, lastName, email, role } = useUserStore();
  const [activeTab, setActiveTab] = useState("explore"); // default active is explore

  return (
    <div className="min-h-screen modal p-8">
      <div className="max-w-4xl mx-auto border border-purple-600 border-solid shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-600">
          Welcome, {firstName} {lastName} 👋
        </h1>
        <p className="nav-menu-item mb-2">
          <strong>Role:</strong> {role === "event_planner" ? "Event Planner" : role}
        </p>
        <p className="nav-menu-item mb-2">
          <strong>Email:</strong> {email}
        </p>

        <div className="my-6">
          <h2 className="text-xl font-semibold mb-2">Your Actions</h2>
          <div className="flex justify-start gap-x-4">
            {/* Explore Artists Button */}
            {activeTab === "explore" ? (
              <DefaultButton
                href={"/artists"}
                text={"Explore Artists"}
                icon={<BrushIcon />}
              />
            ) : (
              <HoverButton
                href={"/artists"}
                text={"Explore Artists"}
                icon={<BrushIcon />}
                onClick={() => setActiveTab("explore")}
              />
            )}

            {/* Events & Bookings Button */}
            {activeTab === "bookings" ? (
              <DefaultButton
                href={"#"}
                text={"Events & Bookings"}
                icon={<EventAvailable />}
              />
            ) : (
              <HoverButton
                href={"#"}
                text={"Events & Bookings"}
                icon={<EventAvailable />}
                onClick={() => setActiveTab("bookings")}
              />
            )}
          </div>
        </div>

        {/* Show bookings only when Events & Bookings is active */}
        {activeTab === "bookings" && <MyBookingsTable />}
      </div>
    </div>
  );
}
