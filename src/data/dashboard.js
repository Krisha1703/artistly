// Dashboard Data for Manager Dashboard

export const mockSubmissions = [
  { id: 1, name: "John Doe", category: "DJ", city: "Bangkok", fee: "$100" },
  { id: 2, name: "Jane Smith", category: "Singer", city: "Chiang Mai", fee: "$150" },
  { id: 3, name: "Alice Johnson", category: "Comedian", city: "Phuket", fee: "$200" },
];

export const mockBookings = [
  { id: 101, event: "Corporate Party", artist: "John Doe", date: "2025-07-01", status: "Pending" },
  { id: 102, event: "Wedding", artist: "Jane Smith", date: "2025-07-10", status: "Confirmed" },
];

export const mockProfiles = [
  { id: 1, name: "John Doe", category: "DJ", rating: "4.8" },
  { id: 2, name: "Jane Smith", category: "Singer", rating: "4.6" },
];

export const menus = [
  { key: "submissions", label: "Artist Submissions" },
  { key: "bookings", label: "Booking Requests" },
  { key: "profiles", label: "Artist Profiles" },
  { key: "analytics", label: "Analytics & Reports" },
];

export const Colors = ["#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"];

export const stackedData = [
  { category: "DJ", submissions: 20, bookings: 12 },
  { category: "Singer", submissions: 30, bookings: 25 },
  { category: "Dancer", submissions: 15, bookings: 10 },
  { category: "Comedian", submissions: 12, bookings: 5 },
  { category: "Magician", submissions: 10, bookings: 8 },
];

export const categoryData = [
  { name: "DJ", value: 20 },
  { name: "Singer", value: 35 },
  { name: "Dancer", value: 25 },
  { name: "Comedian", value: 10 },
  { name: "Magician", value: 10 },
];

export const locationData = [
  { name: "Bangkok", value: 40 },
  { name: "Chiang Mai", value: 30 },
  { name: "Phuket", value: 30 },
];