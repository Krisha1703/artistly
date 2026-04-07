import { motion } from "framer-motion";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import StarIcon from "@mui/icons-material/Star";


export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
     {[
        { label: "Total Artists", value: stats?.totalArtists ?? "—", icon: GroupIcon },
        { label: "Total Bookings", value: stats?.totalBookings ?? "—", icon: EventIcon },
        { label: "Total Users", value: stats?.totalUsers ?? "—", icon: PersonIcon },
        { label: "Completed Payments", value: stats?.completedPayments ?? "—", icon: CheckCircleIcon },
        { label: "Pending Payments", value: stats?.pendingPayments ?? "—", icon: AccessTimeIcon },
        { label: "Failed Payments", value: stats?.failedPayments ?? "—", icon: CancelIcon },
        { label: "Total Revenue", value: stats?.totalRevenue?.toLocaleString() ?? "—", icon: AttachMoneyIcon },
        { label: "Guests Served", value: stats?.guestsServed ?? "—", icon: BarChartIcon },
        { label: "Average Artist Rating", value: stats?.averageArtistRating?.toFixed(1) ?? "—", icon: StarIcon },
    ].map((item, i) => (
        <motion.div
          key={i}
          className="relative p-4 border border-purple-600 rounded-lg shadow text-center bg-transparent cursor-pointer overflow-hidden"
          whileHover="hover"
          transition={{ duration: 0.5 }}
        >
          {/* Hover overlay */}
          <motion.div
            className="absolute top-0 left-0 h-full w-0 bg-purple-600 z-0"
            variants={{ hover: { width: "100%" } }}
            transition={{ duration: 0.5 }}
          />
          {/* Content */}
          <div className="relative z-10 text-purple-600 hover:text-white">
            <p className="text-4xl font-bold  ">
              {item.icon && <item.icon className="mb-2" fontSize="large"/>} {item.value}
            </p>
            <h3 className="mt-2 text-lg  font-medium ">
              {item.label}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
