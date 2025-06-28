"use client";

import useUserStore from "@/app/state/store";

export default function EventPlannerDashboard() {

  const {firstName, lastName, email, role} = useUserStore();

  return (
    <div className="min-h-screen modal p-8">
      <div className="max-w-4xl mx-auto border border-purple-600 border-solid  shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-600">
          Welcome, {firstName} {lastName} 👋
        </h1>
        <p className="nav-menu-item mb-2">
          <strong>Role:</strong> {role === "event_planner" ? "Event Planner" : role}
        </p>
        <p className="nav-menu-item mb-2">
          <strong>Email:</strong> {email}
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Your Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create Event
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              View My Events
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Manage Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
