import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// render post
export const renderPost:any = createAsyncThunk("posts/renderPost",
    async ()=>{
        const response = await axios.get("http://localhost:3000/posts")
        return response.data
    }
)

// Post Feeds
export const postFeed:any = createAsyncThunk("posts/postFeed",
    async (newPost)=>{
        const response = await axios.post("http://localhost:3000/posts", newPost)
        return response.data
    }
)

// Delete Post
export const deletePost: any = createAsyncThunk("posts/deletePost",
    async (postId) => {
        await axios.delete(`http://localhost:3000/posts/${postId}`);
        return postId;
    }
);