"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SidePanel from "@/components/dashboard/side-panel";

import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { menus } from "@/data/dashboard";
import StatsCards from "./stats-cards";
import { categories } from "../../../schemas/onboading-schema";

const AnalyticsCharts = dynamic(() => import("./analytic-charts"), { ssr: false });
const Table = dynamic(() => import("@/components/dashboard/table"), { ssr: false });



const ManagerDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("main");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [stats, setStats] = useState(null);
  const [artists, setArtists] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (selectedMenu === "main") {
      fetch("/api/dashboard/stats").then(r => r.json()).then(setStats);
    }
    if (selectedMenu === "artists") {
      fetch("/api/dashboard/artists").then(r => r.json()).then(setArtists);
    }
    if (selectedMenu === "bookings") {
      fetch("/api/dashboard/bookings").then(r => r.json()).then(setBookings);
    }
  }, [selectedMenu]);

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`/api/artists/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      // refresh list after delete
      setArtists((prev) => prev.filter((a) => a.id !== id));
      setShowDeleteModal(false);
      setSelectedArtist(null);
    } else {
      console.error("Failed to delete artist");
    }
  } catch (err) {
    console.error(err);
  }
};

  const renderContent = () => {
    switch (selectedMenu) {
      case "main":
        return (
          <StatsCards stats={stats}/>
        );

     case "artists":
      return (
        <Table
          columns={[
            { key: "name", title: "Name" },
            { key: "category", title: "Category" },
            { key: "location", title: "City" },
            { key: "languages", title: "Languages" },
            { key: "feeRange", title: "Fee Range" },
            { key: "rating", title: "Rating" },
            { key: "bookingsCount", title: "Bookings" },
          ]}
          data={artists.map((artist) => ({
            ...artist,
            category: artist.category.join(", "),
            languages: artist.languages.join(", "),
            bookingsCount: artist.bookings?.length ?? 0,
          }))}
          actions={(row) => (
            <div className="flex gap-2 text-purple-600">
              {/* Simplified: just Delete */}
              <DeleteIcon
                className="cursor-pointer hover:text-red-600"
                onClick={() => {
                  setSelectedArtist(row);
                  setShowDeleteModal(true);
                }}
              />
              {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                  <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                    <p className="mb-6">
                      Are you sure you want to delete <strong>{selectedArtist?.name}</strong>?
                    </p>
                    <div className="flex justify-end gap-3">
                      <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleDelete(selectedArtist.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        />
      );

   case "bookings":
  return (
    <Table
      columns={[
        { key: "eventDate", title: "Date" },
        { key: "eventTime", title: "Time" },
        { key: "artistName", title: "Artist Name" },
        { key: "artistCity", title: "City" },
        { key: "artistCategory", title: "Category" },
        { key: "guests", title: "Guests" },
        { key: "bookingFee", title: "Fee" },
        { key: "paymentStatus", title: "Status" },
      ]}
      data={bookings.map((booking) => ({
        ...booking,
        artistName: booking.artist?.name ?? "",
        artistCity: booking.artist?.location ?? "",
        artistCategory: Array.isArray(booking.artist?.category)
          ? booking.artist.category.join(", ")
          : booking.artist?.category ?? "",
      }))}

    />
  );




      case "analytics":
        return <AnalyticsCharts />;

      default:
        return <div className="text-gray-500">Select a menu to view content.</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen nav-menu-item">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 bg-purple-700 text-white">
        <h2 className="text-lg font-bold">Manager Dashboard</h2>
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white font-bold text-xl"
        >
          ☰
        </button>
      </div>

      {/* Side Panel */}
      {isMobileMenuOpen && (
        <SidePanel
          menus={menus}
          selectedMenu={selectedMenu}
          setSelectedMenu={(key) => {
            setSelectedMenu(key);
            setMobileMenuOpen(false);
          }}
          isMobile
        />
      )}
      <div className="hidden md:block">
        <SidePanel menus={menus} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      </div>

      {/* Main */}
      <main className="flex-1 px-4 md:px-10 py-6 overflow-x-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default ManagerDashboard;
