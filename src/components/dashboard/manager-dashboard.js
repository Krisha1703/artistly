// Manager Dashboard Component

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SidePanel from "@/components/dashboard/side-panel";

import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { mockSubmissions, mockBookings, mockProfiles, menus } from "@/data/dashboard";

const AnalyticsCharts = dynamic(() => import("./analytic-charts"), { ssr: false });
const Table = dynamic(() => import("@/components/dashboard/table"), { ssr: false });

const ManagerDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("submissions");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (selectedMenu) {
      case "submissions":
        return (
          <Table
            columns={[
              { key: "name", title: "Name" },
              { key: "category", title: "Category" },
              { key: "city", title: "City" },
              { key: "fee", title: "Fee" },
            ]}
            data={mockSubmissions}
            actions={(row) => (
              <div className="flex gap-2 text-purple-600">
                <ViewIcon className="cursor-pointer hover:text-purple-800" />
                <EditIcon className="cursor-pointer hover:text-purple-800" />
                <DeleteIcon className="cursor-pointer hover:text-red-600" />
              </div>
            )}
          />
        );
      case "bookings":
        return (
          <Table
            columns={[
              { key: "event", title: "Event" },
              { key: "artist", title: "Artist" },
              { key: "date", title: "Date" },
              { key: "status", title: "Status" },
            ]}
            data={mockBookings}
            actions={(row) => (
              <div className="flex gap-2 text-blue-600">
                <ViewIcon className="cursor-pointer hover:text-blue-800" />
              </div>
            )}
          />
        );
      case "profiles":
        return (
          <Table
            columns={[
              { key: "name", title: "Name" },
              { key: "category", title: "Category" },
              { key: "rating", title: "Rating" },
            ]}
            data={mockProfiles}
            actions={(row) => (
              <div className="flex gap-2 text-indigo-600">
                <ViewIcon className="cursor-pointer hover:text-indigo-800" />
              </div>
            )}
          />
        );
      case "analytics":
        return <AnalyticsCharts />;
      default:
        return <div className="text-gray-500">Select a menu to view content.</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Toggle Button on Mobile */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 bg-purple-700 text-white">
        <h2 className="text-lg font-bold">Manager Dashboard</h2>
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-white font-bold text-xl">
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
        <SidePanel
          menus={menus}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-6 overflow-x-auto">{renderContent()}</main>
    </div>
  );
};

export default ManagerDashboard;
