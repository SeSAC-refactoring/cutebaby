import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchgrowInfo = createAsyncThunk("baby/fetchBabyInfo", async (_, { rejectWithValue }) => {
    try {
        const user = sessionStorage.getItem("usernumber");
        console.log('reduxer >>>>>' , user)
        const response = await axios.post("http://localhost:5001/api/babygrow", { user });
        
        console.log('reduxer 안에 reponse >>' , response)
        if (!response.data || response.data.length === 0) {
            return [];
        }
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});