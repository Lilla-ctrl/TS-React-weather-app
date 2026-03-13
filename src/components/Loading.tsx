export default function Loading() {
  return (
    <div>
      <div className="p-4 space-y-4">
        {/* Hero skeleton */}
        <div className="bg-primary rounded-xl p-6 h-48 animate-pulse">
          <div className="w-24 h-24 bg-secondary rounded-full mx-auto"></div>
        </div>
      </div>
      {/* Forecast skeleton */}
      <div className="bg-secondary p-2 mx-2 mb-2 rounded-xl grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-30 bg-gray-700 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>

      {/* Conditions skeleton */}
      <div className="bg-secondary min-h-22 py-3 px-2 mx-2 rounded-xl grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-20 bg-gray-700 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
