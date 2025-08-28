"use client";
import { memo } from "react";
import dynamic from "next/dynamic";
import useUserStore from "@/app/state/store";

// Dynamically imported components
const Navbar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false });
const ManagerDashboard = dynamic(() => import("@/components/dashboard/manager-dashboard"), { ssr: false });
const EventPlannerDashboard = dynamic(() => import("@/components/dashboard/event_planner"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });

const Dashboard = () => {
  const { role } = useUserStore();

  const renderDashboard = () => {
    if (!role) {
      return (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-purple-500 font-medium">
            Please login to access the dashboard.
          </p>
        </div>
      );
    }

    if (role === "manager") {
      return <ManagerDashboard />;
    }

    if (role === "event_planner") {
      return <EventPlannerDashboard />;
    }
  };

  return (
    <>
      <Navbar />
      {renderDashboard()}
      <Footer />
    </>
  );
};

export default memo(Dashboard);
