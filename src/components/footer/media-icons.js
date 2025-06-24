//Takes the social media icons and the link to social media website

import { motion } from "framer-motion";

export default function MediaIcons({ icon, href }) { 
    return (
        <motion.a
            href={href}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            aria-label="Social Media Icon"
            className="text-purple-600 hover:text-purple-500 text-xl md:scale-115 scale-125"
        >
            {icon}
        </motion.a>
    );
}