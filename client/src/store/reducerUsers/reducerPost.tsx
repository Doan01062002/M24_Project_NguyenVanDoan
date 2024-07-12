import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../interfaces/page";
import {
  changeStatus,
  deletePost,
  postFeed,
  renderPost,
} from "../../services/posts.service";

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
      // hàm cập nhật lại trạng thái
      .addCase(changeStatus.fulfilled, (state, action) => {
        const index = state.post.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.post[index] = action.payload;
        }
      })
      .addCase(renderPost.rejected, () => {});
  },
});

export default reducerPost.reducer;
