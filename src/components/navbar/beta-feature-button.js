import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function BetaFeatureButton() {
  const pathname = usePathname();
  const isBetaPage = pathname === "/beta-version";

  return (
    <Link href="/beta-version">
     
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`inline-block px-6 py-2 cursor-pointer rounded-lg shadow-md transition-all 
            ${
              isBetaPage
                ? "bg-green-600 hover:bg-green-700 text-white rounded-tr-2xl rounded-bl-2xl"
                : "text-purple-700 bg-white rounded-br-2xl rounded-tl-2xl"
            }
          `}
        >
          {isBetaPage ? "You’re using Beta" : "EventMatch Beta"}
        </motion.span>
  
    </Link>
  );
}
