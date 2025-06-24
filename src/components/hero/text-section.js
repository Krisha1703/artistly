// Text Content of Hero Section

import { motion } from "framer-motion"
import Heading from "../heading";
import Paragraph from "../paragraph";
import ActionButtons from "./action-buttons";

const TextSection = () => {
  return (
    <motion.div
        className="md:w-1/2 text-center md:text-left space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        variants={{
          hidden: {},
          visible: {},
        }}
      >
        {/* Heading */}
        <Heading 
          prefix="Find the" 
          focus="Perfect Artist" 
          suffix="for Any Occasion" 
        />

        {/* Subtext */}
        <Paragraph
          parts={[
            { text: "Whether you're organizing a cozy private gathering or a full-scale festival, " },
            { text: "Artistly", highlight: true },
            { text: " connects you with talented performers across every genre and vibe. From DJs and dancers to speakers and singers — explore handpicked professionals ready to bring energy, emotion, and unforgettable moments to your stage." },
          ]}
        />

        {/* CTA Buttons */}
       <ActionButtons />

    </motion.div>
  )
}

export default TextSection