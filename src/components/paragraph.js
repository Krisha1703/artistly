// Paragraph Component

import { motion } from "framer-motion";

const Paragraph = ({ parts }) => {
  return (
    <motion.p
      className="text-gray-700 text-base sm:text-lg md:text-[1.125rem] leading-relaxed max-w-md md:max-w-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {parts.map((part, index) =>
        part.highlight ? (
          <span key={index} className="text-purple-700 font-medium">
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </motion.p>
  );
};

export default Paragraph;
