// utils/format.js
export const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
