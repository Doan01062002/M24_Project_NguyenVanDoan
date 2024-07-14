import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Reaction, replyComment } from "../interfaces/page";

// render post
export const renderPost: any = createAsyncThunk(
  "posts/renderPost",
  async () => {
    const response = await axios.get("http://localhost:3000/posts");
    return response.data;
  }
);

// Post Feeds
export const postFeed: any = createAsyncThunk(
  "posts/postFeed",
  async (newPost) => {
    const response = await axios.post("http://localhost:3000/posts", newPost);
    return response.data;
  }
);

// Delete Post
export const deletePost: any = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    await axios.delete(`http://localhost:3000/posts/${postId}`);
    return postId;
  }
);

// Change Post status
export const changeStatus: any = createAsyncThunk(
  "posts/changeStatus",
  async ({ id, status }: { id: number; status: boolean }) => {
    const response = await axios.patch(`http://localhost:3000/posts/${id}`, {
      status,
    });
    return response.data;
  }
);

// Comment post
export const commentPost: any = createAsyncThunk(
  "posts/commentPost",
  async ({ postId, comment }: { postId: number; comment: Comment }) => {
    const getPost = await axios.get(`http://localhost:3000/posts/${postId}`);

    const updatePost = {
      ...getPost.data,
      comments: [...getPost.data.comments, comment],
    };
    await axios.patch(`http://localhost:3000/posts/${postId}`, updatePost);
    return { postId, comment };
  }
);

// Reply Comment
export const replyComments: any = createAsyncThunk(
  "posts/replyComment",
  async ({
    postId,
    commentId,
    repComment,
  }: {
    postId: number;
    commentId: number;
    repComment: replyComment;
  }) => {
    // Get the post
    const getPost = await axios.get(`http://localhost:3000/posts/${postId}`);

    // Get the comment
    const getComment = getPost.data.comments.find(
      (comment: any) => comment.id === commentId
    );

    // Update the reply comment
    const updatedReplyComment = {
      ...getComment,
      reply_comment: [...getComment.reply_comment, repComment],
    };

    // Update the post's comments
    const updatedComments = getPost.data.comments.map((comment: any) =>
      comment.id === commentId ? updatedReplyComment : comment
    );

    // Update the post with new comments
    const updatedPost = {
      ...getPost.data,
      comments: updatedComments,
    };

    // Patch the post with updated comments
    await axios.patch(`http://localhost:3000/posts/${postId}`, updatedPost);

    return { postId, commentId, repComment };
  }
);

// Reaction Post
export const reactionPost: any = createAsyncThunk(
  "posts/reactionPost",
  async ({ postId, reaction }: { postId: number; reaction: Reaction }) => {
    const getPost = await axios.get(`http://localhost:3000/posts/${postId}`);

    const updatePost = {
      ...getPost.data,
      reaction: [...getPost.data.reaction, reaction],
    };
    await axios.patch(`http://localhost:3000/posts/${postId}`, updatePost);
    return { postId, reaction };
  }
);

// Cancel reaction Post

export const reactionPostCancel: any = createAsyncThunk(
    "posts/reactionPostCancel",
    async ({ postId, reactionId }: { postId: number; reactionId:number }) => {
      const getPost = await axios.get(`http://localhost:3000/posts/${postId}`);
  
      const updateReactionPost = getPost.data.reaction.filter((reaction:Reaction)=> reaction.user_id !== reactionId )

      await axios.patch(`http://localhost:3000/posts/${postId}`, {reaction: updateReactionPost});
      return { postId, reactionId };
    }
  );