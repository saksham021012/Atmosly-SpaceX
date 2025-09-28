import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    year: "all",
    successOnly: "false",
    favouriteOnly: "false",
}

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setYear: (state, action) => {
            state.year = action.payload;
        },
        toggleSuccessOnly: (state) => {
            state.successOnly = !state.successOnly;
        },
        toggleFavouriteOnly: (state) => {
            state.favouriteOnly = !state.favouriteOnly;
        }
    }
})

export const {setSearch, setYear, toggleSuccessOnly, toggleFavouriteOnly} = filterSlice.actions;
export default filterSlice.reducer;