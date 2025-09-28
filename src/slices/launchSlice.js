import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    launches: [],
    filteredLaunches: [],
    selectedLaunch: null,
    loading: false,
    error: null,
};

const launchSlice = createSlice({
    name: "launches",
    initialState,
    reducers: {
        setLaunches: (state, action) => {
            state.launches = action.payload;
            state.filteredLaunches = action.payload; // Initialize filtered with all launches
        },
        setSelectedLaunch: (state, action) => {
            state.selectedLaunch = action.payload;
        },
        applyFilters: (state, action) => {
            const { search, year, successOnly, favouriteOnly } = action.payload.filters;
            const { favourites } = action.payload;

            let filtered = [...state.launches];

            // Filter by search term
            if (search) {
                filtered = filtered.filter(launch =>
                    launch.name.toLowerCase().includes(search.toLowerCase())
                );
            }

            // Filter by year
            if (year !== "all") {
                filtered = filtered.filter(launch =>
                    new Date(launch.date_utc).getFullYear().toString() === year
                );
            }

            // Filter by success
            if (successOnly === "true" || successOnly === true) {
                filtered = filtered.filter(launch => launch.success === true);
            }

            // Filter by favourites
            if (favouriteOnly === "true" || favouriteOnly === true) {
                filtered = filtered.filter(launch => favourites && favourites.includes(launch.id));
            }

            state.filteredLaunches = filtered;
        },
        resetLaunches: (state) => {
            state.launches = [];
            state.filteredLaunches = [];
        },
        clearSelectedLaunch: (state) => {
            state.selectedLaunch = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
});

export const { setLaunches, setSelectedLaunch, applyFilters, resetLaunches, clearSelectedLaunch, setLoading, setError } = launchSlice.actions;
export default launchSlice.reducer;