import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Render group
export const renderGroup:any = createAsyncThunk("groups/renderGroup",
    async ()=>{
        const response = await axios.get("http://localhost:3000/groups")
        return response.data
    }
);

// Add new group
export const addGroup:any = createAsyncThunk("groups/addGroup",
    async (group)=>{
        const response = await axios.post("http://localhost:3000/groups", group)
        return response.data
    }
);