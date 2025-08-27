
export default function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <table className="w-full border border-gray-200">
      <thead>
        <tr>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i} className="p-2 bg-gray-200 rounded"></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i} className="border-t">
            {Array.from({ length: cols }).map((_, j) => (
              <td key={j} className="p-2">
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
