import { formatDateTime } from "../../../utils/date-formatter";

// Table Component for Manager Dashboard
const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto rounded shadow">
      <table className="custom-dashboard-table min-w-full text-sm border">
        <thead className="bg-purple-600 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-medium">
                {col.title}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 font-medium">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-6 text-gray-500">
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50 border-t">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.key === "date" ? formatDateTime(row[col.key]) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3">{actions(row)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
