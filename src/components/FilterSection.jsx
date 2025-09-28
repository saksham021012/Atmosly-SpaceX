import React from "react";

const FilterSection = ({
  search,
  setSearch,
  year,
  setYear,
  successOnly,
  setSuccessOnly,
  availableYears
}) => {
  return (
    <section className="mb-8" aria-label="Filters">
      {/* input area  */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1 max-w-xs">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search by mission name
          </label>
          <input
            id="search"
            type="text"
            placeholder="e.g., Starlink, CRS, Demo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby="search-help"
          />
        </div>

        {/* year selection  */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Launch Year
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setYear("all")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-all ${year === "all"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
            >
              All Years
            </button>
            {availableYears.slice(0, 6).map(yr => (
              <button
                key={yr}
                onClick={() => setYear(yr.toString())}
                className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-all ${year === yr.toString()
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
              >
                {yr}
              </button>
            ))}
            {availableYears.length > 6 && (
              <select
                value={availableYears.slice(6).includes(parseInt(year)) ? year : ""}
                onChange={(e) => e.target.value && setYear(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">More years...</option>
                {availableYears.slice(6).map(yr => (
                  <option key={yr} value={yr.toString()}>{yr}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* successful toggle  */}
        <div className="flex items-center gap-3 pb-2">
          <span className="text-sm text-gray-600">Successful launches only</span>
          <button
            type="button"
            role="switch"
            aria-checked={successOnly}
            onClick={() => setSuccessOnly(!successOnly)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer
              ${successOnly ? 'bg-green-600' : 'bg-gray-200'}
            `}
            aria-label="Toggle successful launches only filter"
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out
                ${successOnly ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;