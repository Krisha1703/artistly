"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Colors = ["#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"];

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard/analytics")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {/* Bookings per Month */}
      <div className="flex-1 min-w-[300px]">
        <h2 className="text-lg font-semibold mb-5">Bookings Per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={Colors[0]} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Artists by Category */}
      <div className="flex-1 min-w-[300px]">
        <h2 className="text-lg font-semibold mb-5">Artists by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.categoryData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Overview Stats */}
      <div className="flex-1 min-w-[300px]">
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <div className="bg-purple-100 p-4 rounded-md space-y-2 text-purple-900">
          <p>Total Users: {data.totalUsers}</p>
          <p>Total Artists: {data.totalArtists}</p>
          <p>Total Bookings: {data.totalBookings}</p>
          <p>Total Revenue: ${data.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
