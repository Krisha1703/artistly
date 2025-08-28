import { CATEGORY_COLORS } from "@/data/artists";

export function DetailItem({ icon, label, value }) {
  const renderValue = () => {
    if (!value) return "-";


    if (label === "Categories") {
      const categories = Array.isArray(value) ? value : value.split(",");
      return (
        <div className="flex flex-wrap gap-1 mt-1">
          {categories.map((cat, idx) => {
            const colorClass =
              CATEGORY_COLORS[cat.trim()] || "bg-gray-400";
            return (
              <span
                key={idx}
                className={`px-2 py-0.5 text-xs rounded-full text-white ${colorClass}`}
              >
                {cat.trim()}
              </span>
            );
          })}
        </div>
      );
    }


    if (label === "Fee Range") {
      return (
        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-green-500 text-white">
          {value}
        </span>
      );
    }

    if (label === "Rating") {
      return (
        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-yellow-400 text-white">
          {value} 
        </span>
      );
    }

    return <span>{value}</span>;
  };

  return (
    <div className="flex items-start gap-2">
      {icon}
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{label}</p>
        <div className="text-sm">{renderValue()}</div>
      </div>
    </div>
  );
}