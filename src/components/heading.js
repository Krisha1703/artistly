// Heading Component

import { motion } from "framer-motion";

const Heading = ({
  prefix,
  focus,
  suffix,
  focusClass = "heading-focus", 
  subheading
}) => {
  return (
    <motion.h2
      className={`${
        subheading
          ? "text-2xl md:justify-center mb-4"
          : "text-4xl md:justify-start"
      } heading-primary font-extrabold leading-tight flex items-center gap-3 justify-center`}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span>
        {prefix}{" "}
        <span className={`${focusClass} italic`}>{focus}</span>{" "}
        {suffix}
      </span>
    </motion.h2>
  );
};

export default Heading;

