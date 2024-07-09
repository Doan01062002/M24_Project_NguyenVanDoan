import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../interfaces/page";
import { renderPost } from "../../services/user.service";

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
      .addCase(renderPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(renderPost.rejected, () => {});
  },
});

export default reducerPost.reducer;
