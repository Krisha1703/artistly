"use client"
import { memo } from "react";
import dynamic from "next/dynamic";
import useUserStore from "@/app/state/store";

// Dynamically imported components
const Navbar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false });
const ManagerDashboard = dynamic(() => import("@/components/dashboard/manager-dashboard"), { ssr: false });
const EventPlannerDashboard = dynamic(() => import("@/components/dashboard/event_planner"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });

const Onboard = () => {
  const { role } = useUserStore();
  return (
    <>
      <Navbar />
      {role === "manager" ? (
        <ManagerDashboard />
      ) : (
        <EventPlannerDashboard />
      )}

      <Footer />
    </>
  );
};

export default memo(Onboard);