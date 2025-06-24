// NavMenu Component

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NavMenu({ Menu, Route }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={Route} aria-label="Navbar Menus" className="relative text-purple-500  hover:text-purple-600 cursor-pointer block lg:py-2 sssm:py-1">
          {Menu}
          <motion.span
            className="absolute left-0 md:top-0 -top-1 w-full h-[2px] bg-purple-600 rounded-lg"
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          />
        </Link>
      </motion.div>
    </>
  );
}