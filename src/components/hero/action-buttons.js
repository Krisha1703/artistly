// Action Buttons for the Hero Section

import { motion } from "framer-motion"

import dynamic from "next/dynamic";

const RecordVoiceOverIcon = dynamic(() => import("@mui/icons-material/RecordVoiceOver"), { ssr: false });
const BrushIcon = dynamic(() => import("@mui/icons-material/Brush"), { ssr: false });
const HoverButton = dynamic(() => import("../button/hover-button"), { ssr: false });
const DefaultButton = dynamic(() => import("../button/default-button"), { ssr: false });

const ActionButtons = () => {
  return (
     <motion.div
        className="flex flex-col md:flex-row gap-4 justify-center md:justify-start pt-2"
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