//Takes the menu name and link to the page for navigation

import Link from "next/link";
import { motion } from "framer-motion";

export default function FooterMenus({Menu,Route}){ 
    return(
        <motion.li className="mb-2" initial={{x: 0}} whileHover={{ scale: 1.1, x: 20}} transition={{duration: 0.5, ease: "easeInOut"}}>
            <Link href={Route} aria-label="Footer Menus" className=" font-semibold hover:text-purple-500 md:text-[1rem] text-lg">
                {Menu}
            </Link>
        </motion.li>
    );
}