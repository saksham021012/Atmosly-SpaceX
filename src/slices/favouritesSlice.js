import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("favourites")) || [];

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        markFavourite: (state, action) => {
            const missionId = action.payload;
            
            if(state.includes(missionId)){
                // Remove from favorites
                const index = state.indexOf(missionId);
                state.splice(index, 1);
            } else {
                // Add to favorites
                state.push(missionId);
            }

            // Update localStorage with the current state
            localStorage.setItem("favourites", JSON.stringify(state));
        }
    }
});

export const {markFavourite} = favouritesSlice.actions;
export default favouritesSlice.reducer;