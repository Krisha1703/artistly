import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";

export const CATEGORY_COLORS = {
  DJ: "bg-pink-500",
  Singer: "bg-orange-500",
  Dancer: "bg-cyan-500",
  Speaker: "bg-blue-500",
  Magician: "bg-purple-500",
  Comedian: "bg-rose-500",
  Acrobat: "bg-red-500",
  Instrumentalist: "bg-teal-500",
};

export const EVENT_TO_ARTIST_CATEGORIES = {
  birthday: ["Magician", "Comedian", "Instrumentalist"],
  wedding: ["DJ", "Singer", "Dancer", "Photographer"],
  "school-function": ["Speaker", "Dancer", "Magician"],
  "pool-party": ["DJ", "Singer"],
  default: ["DJ", "Singer", "Dancer"], 
};

export {LocationOnIcon, CategoryIcon, LanguageIcon, CalendarMonthIcon, AttachMoneyIcon, StarIcon}