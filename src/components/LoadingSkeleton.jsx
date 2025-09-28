const LoadingSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-5 w-5 bg-gray-300 rounded"></div>
    </div>
    <div className="space-y-2 mb-3">
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 bg-gray-300 rounded w-12"></div>
      <div className="h-6 bg-gray-300 rounded w-12"></div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-20"></div>
  </div>
);

export default LoadingSkeleton;