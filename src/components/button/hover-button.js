// Interactive Button for Hover Effect

import { motion } from "framer-motion";
import Link from "next/link";

const HoverButton = ({text, icon, href}) => {
  return (
     <Link
        href={href}
        aria-label="Click to navigate"
    >
        <motion.button
            className="relative cursor-pointer overflow-hidden md:bg-transparent  bg-purple-600 text-purple-600 border hover:text-white border-purple-600 border-solid md:px-8 md:py-2 p-2 px-6 rounded-lg font-semibold"
        
            whileHover="hover"
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="absolute top-0 left-0 h-full md:min-w-0 min-w-full bg-purple-600 z-0"
                variants={{
                    hover: { width: "100%" },
                }}
                transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">{icon}</span>
            <span className="relative z-10 ml-1">{text}</span>
        </motion.button>

    </Link>
  )
}

export default HoverButton