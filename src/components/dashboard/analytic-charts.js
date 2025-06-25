// Analytic Charts Component

"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { locationData, stackedData, categoryData, Colors } from "@/data/dashboard";

const AnalyticsCharts = () => {
  return (
    <div className="space-y-10">
        <div className="flex md:justify-between flex-col md:flex-row gap-6">
            <div>
                <h3 className="text-xl font-bold nav-menu-item mb-4">Artist Category Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                    >
                    {categoryData.map((entry, index) => (
                        <Cell key={entry.name} fill={Colors[index % Colors.length]} />
                    ))}
                    </Pie>
                    <Legend />
                </PieChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h3 className="text-xl font-bold nav-menu-item mb-4">Submissions vs Bookings by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stackedData}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="submissions" stackId="a" fill="#a78bfa" />
                    <Bar dataKey="bookings" stackId="a" fill="#7c3aed" />
                </BarChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h3 className="text-xl font-bold nav-menu-item mb-4">Artist Submissions by Location</h3>
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={locationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    label
                    >
                    {locationData.map((entry, index) => (
                        <Cell key={entry.name} fill={Colors[index % Colors.length]} />
                    ))}
                    </Pie>
                    <Legend />
                </PieChart>
                </ResponsiveContainer>
            </div>
      </div>

    </div>
  );
};

export default AnalyticsCharts;
