// Navbar Component

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import NavMenu from "./nav-menu";
import Link from "next/link";
import Heading from "../heading";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="relative flex items-center justify-between w-full md:p-4 p-6 bg-white z-20">
      <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
        <Link href="/" aria-label="Artistly Home" >
            <Heading
              focus="Artistly"
            /> 
        </Link>
      </motion.div>

      <div className="lg:hidden cursor-pointer mr-10" onClick={toggleMenu}>
        <div className="bg-purple-500 w-6 h-1 rounded-lg my-1"></div>
        <div className="bg-purple-500 w-6 h-1 rounded-lg my-1"></div>
        <div className="bg-purple-500 w-6 h-1 rounded-lg my-1"></div>
      </div>

      <nav
        className={`fixed top-0 right-0 h-full md:w-1/3 w-1/2 bg-white shadow-lg transition-transform transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none lg:flex lg:items-center lg:justify-between z-30`}
      >
        <div
          className="lg:hidden cursor-pointer ml-10 mt-10"
          onClick={toggleMenu}
        >
          <div
            className={`transform -translate-x-1/2 -translate-y-1 bg-purple-700 rounded-lg w-7 h-1 mb-1 transition-all ${
              menuOpen ? "hidden" : ""
            }`}
          ></div>
          <div
            className={`transform -translate-x-1/2 -translate-y-1 bg-purple-500 rounded-lg w-7 h-1 mb-1 transition-all ${
              menuOpen ? "rotate-45 w-10 translate-y-1" : ""
            }`}
          ></div>
          <div
            className={`transform -translate-x-1/2 -translate-y-1 bg-purple-700 rounded-lg w-7 h-1 mb-1 transition-all ${
              menuOpen ? "-rotate-45 w-10" : "rotate-0"
            }`}
          ></div>
        </div>

        <ul className="text-purple-400 text-xl md:text-lg flex flex-col lg:flex-row list-none space-y-4 mt-20 md:mt-0 lg:space-y-0 lg:space-x-8 lg:-ml-10  lg:p-0 lg:justify-between items-center">
          <NavMenu Menu="Explore Artists" Route="/artists" />
          <NavMenu Menu="Onboard Artist" Route="/onboard" />
          <NavMenu Menu="Dashboard" Route="/dashboard" />
        </ul>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMenu}
        />
      )}

    </header>
  );
};

export default React.memo(Navbar);