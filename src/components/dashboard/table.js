// Table Component for Manager Dashboard

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto rounded shadow">
      <table className="min-w-full text-sm border">
        <thead className="bg-purple-600 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-medium">
                {col.title}
              </th>
            ))}
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-6 text-gray-500">
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50 border-t">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {row[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3">{actions(row)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
