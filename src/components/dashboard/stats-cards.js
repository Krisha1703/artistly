import { motion } from "framer-motion";

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
     {[
        { label: "Total Artists", value: stats?.totalArtists ?? "—" },
        { label: "Total Bookings", value: stats?.totalBookings ?? "—" },
        { label: "Total Users", value: stats?.totalUsers ?? "—" },
        { label: "Completed Payments", value: stats?.completedPayments ?? "—" },
        { label: "Pending Payments", value: stats?.pendingPayments ?? "—" },
        { label: "Failed Payments", value: stats?.failedPayments ?? "—" },
        { label: "Total Revenue", value: stats?.totalRevenue?.toLocaleString() ?? "—" },
        { label: "Guests Served", value: stats?.guestsServed ?? "—" },
        { label: "Average Artist Rating", value: stats?.averageArtistRating?.toFixed(1) ?? "—" },
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
              {item.value}
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
