// Navbar Component

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import NavMenu from "./nav-menu";
import Link from "next/link";
import Heading from "../heading";
import useUserStore from '@/app/state/store';
import { useRouter } from 'next/navigation';
import ThemeToggleButton from "./theme-toggle-button";


import dynamic from "next/dynamic";

// Lazy load modals
const Login = dynamic(() => import("../form-modal/login"), { ssr: false });
const SignUp = dynamic(() => import("../form-modal/signup"), { ssr: false });
const User = dynamic(() => import("../form-modal/user"), { ssr: false });

// Lazy load icon
const AccountCircleIcon = dynamic(
  () => import("@mui/icons-material/AccountCircle"),
  { ssr: false }
);


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const router = useRouter();
    // Get user state from the store
  const { firstName, lastName, email, role } = useUserStore();

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

   const handleSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
  };

  const handleLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  // Logout handler
  const handleLogout = () => {
    useUserStore.getState().resetUser(); 
    setIsUserModalOpen(false);
    router.push("/"); 
  };

  // Generate initials
  const getInitials = (first, last) => {
    const firstInitial = first && typeof first === 'string' ? first[0].toUpperCase() : ''; 
    const lastInitial = last && typeof last === 'string' ? last[0].toUpperCase() : ''; 
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <header className="navbar relative flex items-center justify-between w-full md:p-4 p-6 z-20">
      <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
        <Link href="/" aria-label="Artistly Home" >
            <Heading
              focus="Artistly.com"
            /> 
        </Link>
      </motion.div>

      <div className="lg:hidden cursor-pointer mr-10" onClick={toggleMenu}>
        <div className="bg-purple-500 w-6 h-1 rounded-lg my-1"></div>
        <div className="bg-purple-500 w-6 h-1 rounded-lg my-1"></div>
        <div className="bg-purple-500 w-6 h-1 rounded-lg my-1"></div>
      </div>

      <nav
        className={`fixed top-0 right-0 h-full md:w-full w-1/2  shadow-lg transition-transform transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none lg:flex lg:items-center lg:justify-end z-30`}
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

        <ul className=" text-xl md:text-lg flex flex-col lg:flex-row list-none space-y-4 mt-20 md:mt-0 lg:space-y-0 lg:space-x-8 lg:-ml-10  lg:p-0 lg:justify-between items-center">
          <NavMenu Menu="Explore Artists" Route="/artists" />
          <NavMenu Menu="Onboard Artist" Route="/onboard" />
          <NavMenu Menu="Dashboard" Route="/dashboard" />
          <ThemeToggleButton />

            {/* User sign in button*/}
           <motion.li
            initial={{ color: '#a855f7' }}        
            whileHover={{ color: '#7e22ce' , x: 5 , y: -2}}    
            transition={{ duration: 0.5 }}
            className="p-4 cursor-pointer flex items-center gap-2"
            onClick={() => {
              if (!email) {
                setIsLoginOpen(true);
              } else {
                setIsUserModalOpen(true);
              }
            }}
          >
             {/* Shows user's initals and firstname, if login successfully*/}
            {firstName ? (
              <div className="flex items-center gap-2">
                <div
                  className="user rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold"
                >
                  {getInitials(firstName, lastName)}
                </div>
                <h1 className="nav-menu-item">Hi, {firstName}!</h1>
              </div>
            ) : (
              <div className="flex items-center text-primary nav-menu-item">
                <AccountCircleIcon className="scale-125" />
                <h1 className="ml-1">Sign In</h1>
              </div>
            )}
          </motion.li>


          <div data-testid="login-modal">
            {isLoginOpen && (
              <Login
                onClose={() => setIsLoginOpen(false)}
                onSwitchToSignUp={handleSignUp}
              />
            )}
          </div>

          {isSignUpOpen && (
            <SignUp
              onClose={() => setIsSignUpOpen(false)}
              onSwitchToLogin={handleLogin}
              data-testid="signup-modal"
            />
          )}

          <div data-testid="user-modal">
            {isUserModalOpen && (
              <User
                onClose={() => setIsUserModalOpen(false)}
                onLogout={handleLogout}
                onGoToDashboard={() => router.push('/dashboard')}
                firstname={firstName}
                lastname={lastName}
                email={email}
              />
            )}
          </div>
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