import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLaunches, applyFilters, setSelectedLaunch, setLoading, setError } from "./slices/launchSlice";
import { markFavourite } from "./slices/favouritesSlice";
import { fetchLaunches } from "./api/spacex";
import useDebounce from "./hooks/useDebounce";
import LaunchGrid from "./components/LaunchGrid";
import Modal from "./components/Modal";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";

export default function App() {
  const dispatch = useDispatch();
  const { filteredLaunches, selectedLaunch, loading, error, launches } = useSelector((state) => state.launches);
  const favourites = useSelector((state) => state.favourite);

  // Local filter state
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [successOnly, setSuccessOnly] = useState(false);
  const [favouriteOnly, setFavouriteOnly] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Debounced search
  const debouncedSearch = useDebounce(search, 500);

  // Fetch launches on mount
  useEffect(() => {
    const loadLaunches = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchLaunches();
        dispatch(setLaunches(data));
      } catch (err) {
        dispatch(setError(err.message || 'Failed to fetch launches'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadLaunches();
  }, [dispatch]);

  // Apply filters when debounced search or other filters change
  useEffect(() => {
    dispatch(
      applyFilters({
        filters: { search: debouncedSearch, year, successOnly, favouriteOnly },
        favourites,
      })
    );
    setCurrentPage(1);
  }, [debouncedSearch, year, successOnly, favouriteOnly, favourites, dispatch]);

  // Memoized handlers
  const handleToggleFavorite = useCallback((launchId) => {
    dispatch(markFavourite(launchId));
  }, [dispatch]);

  const handleViewDetails = useCallback((launch) => {
    dispatch(setSelectedLaunch(launch));
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    dispatch(setSelectedLaunch(null));
  }, [dispatch]);

  const handleFavouriteOnlyChange = useCallback((checked) => {
    setFavouriteOnly(checked);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // years available for filtering
  const availableYears = useMemo(() => {
    if (!launches || launches.length === 0) return [];
    const years = new Set();
    launches.forEach(launch => {
      years.add(new Date(launch.date_utc).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [launches]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        favouriteOnly={favouriteOnly}
        onFavouriteOnlyChange={handleFavouriteOnlyChange}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Filters */}
        <FilterSection
          search={search}
          setSearch={setSearch}
          year={year}
          setYear={setYear}
          successOnly={successOnly}
          setSuccessOnly={setSuccessOnly}
          availableYears={availableYears}
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="text-red-400">⚠️</div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading launches</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Launch Grid Component */}
        <LaunchGrid
          filteredLaunches={filteredLaunches}
          favourites={favourites}
          loading={loading}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          search={search}
          year={year}
          successOnly={successOnly}
          favouriteOnly={favouriteOnly}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
          onPageChange={handlePageChange}
        />
      </main>

      {/* Launch Details Modal */}
      <Modal
        launch={selectedLaunch}
        onClose={handleCloseModal}
      />
    </div>
  );
}