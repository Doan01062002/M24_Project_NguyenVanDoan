import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// render post
export const renderPost:any = createAsyncThunk("posts/renderPost",
    async ()=>{
        const response = await axios.get("http://localhost:3000/posts")
        return response.data
    }
)