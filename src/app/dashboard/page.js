"use client"
import { memo } from "react";
import dynamic from "next/dynamic";;

// Dynamically imported components
const Navbar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false });
const ManagerDashboard = dynamic(() => import("@/components/dashboard/manager-dashboard"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });

const Onboard = () => {
  return (
    <>
      <Navbar />
      <ManagerDashboard />
      <Footer />
    </>
  );
};

export default memo(Onboard);