import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, FriendRequest, Friend } from "../interfaces/page";

// Render user
export const renderUser:any = createAsyncThunk("users/renderUser",
    async ()=>{
        const response = await axios.get("http://localhost:3000/users")
        return response.data
    }
);

// Add new user
export const addUser:any = createAsyncThunk("users/addUser",
    async (user)=>{
        const response = await axios.post("http://localhost:3000/users", user)
        return response.data
    }
);

// Update user
export const updateUser:any = createAsyncThunk(
    "users/updateUser",
    async ({ id, user }: { id: number; user: User }) => {
      const response = await axios.patch(`http://localhost:3000/users/${id}`, user);
      return response.data;
    }
);

// Send friend request
export const sendFriendRequest:any = createAsyncThunk(
  "friendRequests/sendFriendRequest",
  async ({ fromUserId, toUserId }: { fromUserId: number; toUserId: number }) => {
    const response = await axios.post("http://localhost:3000/friend_requests", {
      from_user_id: fromUserId,
      to_user_id: toUserId,
      status: "pending",
      created_at: new Date().toISOString()
    });
    return response.data;
  }
);

// Fetch friend requests
export const fetchFriendRequests:any = createAsyncThunk(
  "friendRequests/fetchFriendRequests",
  async (userId: number) => {
    const response = await axios.get(`http://localhost:3000/friend_requests?to_user_id=${userId}&status=pending`);
    const requestsWithUserDetails = await Promise.all(response.data.map(async (request: FriendRequest) => {
      const fromUserResponse = await axios.get(`http://localhost:3000/users/${request.from_user_id}`);
      return {
        ...request,
        fromUser: fromUserResponse.data
      };
    }));
    return requestsWithUserDetails;
  }
);

// Accept friend request
export const acceptFriendRequest: any = createAsyncThunk(
    "friendRequests/acceptFriendRequest",
    async ({
      requestId,
      fromUserId,
      toUserId,
    }: {
      requestId: number;
      fromUserId: number;
      toUserId: number;
    }) => {
      await axios.patch(`http://localhost:3000/friend_requests/${requestId}`, {
        status: "accepted",
      });
  
      const fromUser = await axios.get(`http://localhost:3000/users/${fromUserId}`);
      const toUser = await axios.get(`http://localhost:3000/users/${toUserId}`);
  
      const newFriendForFromUser: Friend = {
        userId: toUserId,
        nameFriend: toUser.data.name,
        imageFriend: toUser.data.avatar,
        add_at: new Date().toISOString(),
      };
  
      const newFriendForToUser: Friend = {
        userId: fromUserId,
        nameFriend: fromUser.data.name,
        imageFriend: fromUser.data.avatar,
        add_at: new Date().toISOString(),
      };
  
      const updatedFromUser = {
        ...fromUser.data,
        friends: [...fromUser.data.friends, newFriendForFromUser],
      };
      await axios.patch(`http://localhost:3000/users/${fromUserId}`, updatedFromUser);
  
      const updatedToUser = {
        ...toUser.data,
        friends: [...toUser.data.friends, newFriendForToUser],
      };
      await axios.patch(`http://localhost:3000/users/${toUserId}`, updatedToUser);
  
      return { requestId, fromUserId, toUserId, newFriendForFromUser, newFriendForToUser };
    }
  );
  
  // Delete friend request
  export const deleteFriendRequest: any = createAsyncThunk(
    "friendRequests/deleteFriendRequest",
    async (requestId: number) => {
      await axios.delete(`http://localhost:3000/friend_requests/${requestId}`);
      return requestId;
    }
  );

  // Change job status
export const changeStatus:any = createAsyncThunk("users/changeStatus", async ({ id, status }: { id: number, status: boolean }) => {
  const response = await axios.patch(`http://localhost:3000/users/${id}`, { status });
  return response.data;
});