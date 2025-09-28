import axios from "axios";

const BASE = "https://api.spacexdata.com/v4";

export const fetchLaunches = async() =>{
    try {
        const {data} = await axios.get(`${BASE}/launches`);
        return data;
    } catch (error) {
        console.error("Failed to fetch all launches: ", error);
        throw error;
    }   
}

export const fetchLaunchByID = async(id) => {
    try {
        const {data} = await axios.get(`${BASE}/launches/${id}`);
        return data;
    } catch (error) {
        console.error("Failed to fetch launch by ID: ", error);
        throw error;
    }
}

export const fetchRocketById = async(id) => {
    try {
        const {data} = await axios.get(`${BASE}/rockets/${id}`);
        return data;
    } catch (error) {
        console.error("Failed to fetch rocket details: ", error);
        throw error;
    }
}