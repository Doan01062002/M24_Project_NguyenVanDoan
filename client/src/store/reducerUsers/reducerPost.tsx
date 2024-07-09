import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../interfaces/page";
import { deletePost, postFeed, renderPost } from "../../services/posts.service";

const state: Post[] = [];

const reducerPost = createSlice({
  name: "reducerPost",
  initialState: {
    post: state,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(renderPost.pending, (state, action) => {})
      // render post feed
      .addCase(renderPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      // add post feed
      .addCase(postFeed.fulfilled, (state, action) => {
        state.post.push(action.payload);
      })
      // delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = state.post.filter(
          (post: Post) => post.id !== action.payload
        );
      })
      .addCase(renderPost.rejected, () => {});
  },
});

export default reducerPost.reducer;
