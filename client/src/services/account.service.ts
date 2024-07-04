import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Render user
export const renderUser:any = createAsyncThunk("users/renderUser",
    async ()=>{
        const response = await axios.get("http://localhost:3000/users")
        return response.data
    }
)

// Add new user
export const addUser:any = createAsyncThunk("users/addUser",
    async (user)=>{
        const response = await axios.post("http://localhost:3000/users",user)
        return response.data
    }
)