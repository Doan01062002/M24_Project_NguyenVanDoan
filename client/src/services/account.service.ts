import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../interfaces/page";

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

// Update user
export const updateUser:any = createAsyncThunk(
    "users/updateUser",
    async ({ id, user }: { id: number; user: User }) => {
      const response = await axios.patch(`http://localhost:3000/users/${id}`, user);
      return response.data;
    }
  );