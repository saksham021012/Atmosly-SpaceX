import { combineReducers } from "@reduxjs/toolkit";
import favReducer from "../slices/favouritesSlice";
import filterReducer from "../slices/filterSlice";  
import launchReducer from "../slices/launchSlice";

const rootReducer = combineReducers({
    favourite: favReducer,
    filters: filterReducer,
    launches: launchReducer,
    
})

export default rootReducer;