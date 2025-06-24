// Action Buttons for the Hero Section

import { motion } from "framer-motion"
import HoverButton from "../button/hover-button";
import DefaultButton from "../button/default-button";
import BrushIcon from "@mui/icons-material/Brush";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

const ActionButtons = () => {
  return (
     <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
    >
        <DefaultButton 
            text={"Explore Artists"}
            icon={<BrushIcon />}
            href={"/artists"}
        />

        <HoverButton 
            icon={<RecordVoiceOverIcon />}
            text={"Onboard an Artist"}
            href={"/onboard"}
        />

    </motion.div>
  )
}

export default ActionButtons