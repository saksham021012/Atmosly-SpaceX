import React from 'react';

const Header = ({ favouriteOnly, onFavouriteOnlyChange }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Atmosly · SpaceX Mission Explorer
            </h1>
            <p className="text-sm text-gray-500">
              Explore SpaceX launches, filter by criteria, and save your favorites
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Show favorites only</span>
            <button
              type="button"
              role="switch"
              aria-checked={favouriteOnly}
              onClick={() => onFavouriteOnlyChange(!favouriteOnly)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${favouriteOnly ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              aria-label="Toggle show favorites only"
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out
                  ${favouriteOnly ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;