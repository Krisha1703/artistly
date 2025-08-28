import { useTheme } from "../../../context/theme-context";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState, useEffect } from "react";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 theme-toggle px-3 py-1 rounded"
    >
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
