import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../interfaces/page";
import {
  changeStatus,
  commentPost,
  deletePost,
  postFeed,
  reactionPost,
  reactionPostCancel,
  renderPost,
  replyComments,
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
      // Comment Post
      .addCase(commentPost.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const postIndex = state.post.findIndex(
          (post: Post) => post.id === postId
        );
        if (postIndex !== -1) {
          state.post[postIndex].comments.push(comment);
        }
      })
      // Reaction Post
      .addCase(reactionPost.fulfilled, (state, action) => {
        const { postId, reaction } = action.payload;
        const postIndex = state.post.findIndex(
          (post: Post) => post.id === postId
        );
        if (postIndex !== -1) {
          state.post[postIndex].reaction.push(reaction);
        }
      })
      // Cancel Reaction Post
      .addCase(reactionPostCancel.fulfilled, (state, action) => {
        const { postId, reactionId } = action.payload;

        const postIndex = state.post.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          state.post[postIndex].reaction = state.post[
            postIndex
          ].reaction.filter((reaction) => reaction.user_id !== reactionId);
        }
      })
      // reply comment
      .addCase(replyComments.fulfilled, (state, action) => {
        const { postId, commentId, replyComment } = action.payload;
        const postIndex = state.post.findIndex(
          (post: Post) => post.id === postId
        );
        if (postIndex !== -1) {
          const commentIndex = state.post[postIndex].comments.findIndex(
            (comment: any) => comment.id === commentId
          );
          if (commentIndex !== -1) {
            state.post[postIndex].comments[commentIndex].reply_comment.push(
              replyComment
            );
          }
        }
      });
  },
});

export default reducerPost.reducer;
