import React, { useMemo } from "react";
import LaunchCard from "./LaunchCard";
import LoadingSkeleton from "./LoadingSkeleton";

const LaunchGrid = ({
  filteredLaunches,
  favourites,
  loading,
  currentPage,
  itemsPerPage,
  search,
  year,
  successOnly,
  favouriteOnly,
  onToggleFavorite,
  onViewDetails,
  onPageChange
}) => {
  // memoize pagination calculations
  const { totalPages, startIndex } = useMemo(() => ({
    totalPages: Math.ceil(filteredLaunches.length / itemsPerPage),
    startIndex: (currentPage - 1) * itemsPerPage
  }), [filteredLaunches.length, currentPage, itemsPerPage]);

  // memoize current launches for 
  const currentLaunches = useMemo(() =>
    filteredLaunches.slice(startIndex, startIndex + itemsPerPage),
    [filteredLaunches, startIndex, itemsPerPage]
  );

  // loading
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  // empty state
  if (currentLaunches.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No launches found</h3>
        <p className="text-gray-500">
          {search || year !== 'all' || successOnly || favouriteOnly
            ? 'Try adjusting your filters to see more results'
            : 'No launch data available at the moment'
          }
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Launch Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {currentLaunches.map((launch) => (
          <LaunchCard
            key={launch.id}
            launch={launch}
            isFavorite={favourites?.includes(launch.id)}
            onToggleFavorite={onToggleFavorite}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center items-center gap-2 text-sm text-gray-600" aria-label="Pagination">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to previous page"
          >
            Previous
          </button>
          <span aria-current="page">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to next page"
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
};

export default LaunchGrid;