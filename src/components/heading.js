// Heading Component

import { motion } from "framer-motion";

const Heading = ({ prefix, focus, suffix, focusClass = "text-purple-600", subheading }) => {
  return (
    <motion.h2
      className={`${subheading ? "text-2xl  md:justify-center mb-4" : "text-4xl  md:justify-start"} font-extrabold leading-tight text-purple-800 flex items-center gap-3 justify-center`}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span>
        {prefix}{" "}
        <span className={focusClass}>{focus}</span>{" "}
        {suffix}
      </span>
    </motion.h2>
  );
};

export default Heading;
