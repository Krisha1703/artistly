// Footer Component

import FooterMenus from "./footer-menus";
import { motion } from "framer-motion";
import MediaIcons from "./media-icons";
import { memo } from "react";
import { Facebook, Instagram, LinkedIn, X } from "@mui/icons-material";
import DefaultButton from "../button/default-button";

const Footer = () => {
  const variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <footer className="footer relative bg-purple-50 text-gray-800">
      <div className="container w-11/12 mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left py-10 px-5">
        {/* Explore */}
        <motion.div initial="hidden" animate="visible" custom="left" variants={variants}>
          <h3 className="text-purple-700 font-bold text-lg mb-4 md:scale-100 scale-125">Explore</h3>
          <ul>
            <FooterMenus Menu="Home" Route="/" />
            <FooterMenus Menu="About Artistly" Route="/" />
            <FooterMenus Menu="Find Artists" Route="/artists" />
            <FooterMenus Menu="Become an Artist" Route="/onboard" />
            <FooterMenus Menu="Contact" Route="/" />
          </ul>
        </motion.div>

        {/* Help */}
        <motion.div initial="hidden" animate="visible" custom="left" variants={variants}>
          <h3 className="text-purple-700 font-bold text-lg mb-4 md:scale-100 scale-125">Help</h3>
          <ul>
            <FooterMenus Menu="How It Works" Route="/" />
            <FooterMenus Menu="Booking Policy" Route="/" />
            <FooterMenus Menu="Support" Route="/support" />
            <FooterMenus Menu="Terms & Conditions" Route="/" />
            <FooterMenus Menu="Privacy Policy" Route="/" />
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div initial="hidden" animate="visible" custom="top" variants={variants}>
          <h3 className="text-purple-700 font-bold text-lg mb-4 md:scale-100 scale-125">Get in Touch</h3>
          <div className="text-md mb-2 font-medium ">
            <p className="mb-1">123 Harmony Lane, Mumbai, India</p>
            <p>
              <a href="mailto:hello@artistly.com" className="hover:text-purple-600">
                hello@artistly.com
              </a>
            </p>
            <p>+91 98765 43210</p>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div initial="hidden" animate="visible" custom="bottom" variants={variants}>
          <h3 className="text-purple-700 font-bold text-lg mb-4 md:scale-100 scale-125">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-3">
            <MediaIcons icon={<LinkedIn />} href="https://www.linkedin.com" />
            <MediaIcons icon={<Facebook />} href="https://www.facebook.com" />
            <MediaIcons icon={<Instagram />} href="https://www.instagram.com" />
            <MediaIcons icon={<X />} href="https://twitter.com" />
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div initial="hidden" animate="visible" custom="right" variants={variants}>
          <h3 className="text-purple-700 font-bold text-lg mb-4 md:scale-100 scale-125">Stay in the Loop</h3>
          <p className="text-sm mb-4 font-medium">
            Subscribe for artist highlights, event tips & updates.
          </p>
          <form className="flex flex-col items-center md:items-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 mb-2 border rounded w-full focus:outline-purple-600"
            />
             <DefaultButton 
                text={"Subscribe"}
               
                href={"/artists"}
            />
          </form>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="border-t border-purple-200 py-4 bg-purple-100 text-center text-sm text-purple-700">
        &copy; {new Date().getFullYear()} Artistly. All rights reserved.
      </div>
    </footer>
  );
};

export default memo(Footer);
