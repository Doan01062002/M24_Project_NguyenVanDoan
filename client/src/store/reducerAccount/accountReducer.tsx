import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  renderUser,
  updateUser,
  sendFriendRequest,
  fetchFriendRequests,
  acceptFriendRequest,
  deleteFriendRequest,
  changeStatus,
} from "../../services/account.service";
import { User, FriendRequest, Friend } from "../../interfaces/page";

const initialState = {
  accountUser: [] as User[],
  friendRequests: [] as FriendRequest[],
};

const reducerAccount = createSlice({
  name: "reducerAccount",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(renderUser.fulfilled, (state, action) => {
        state.accountUser = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.accountUser.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.accountUser.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.accountUser[index] = action.payload;
        }
      })
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.friendRequests = action.payload;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.friendRequests.push(action.payload);
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        const {
          requestId,
          fromUserId,
          toUserId,
          newFriendForFromUser,
          newFriendForToUser,
        } = action.payload;

        // Xóa lời mời kết bạn khỏi danh sách
        state.friendRequests = state.friendRequests.filter(
          (request) => request.id !== requestId
        );

        // Cập nhật danh sách bạn bè của người nhận
        const toUserIndex = state.accountUser.findIndex(
          (user) => user.id === toUserId
        );
        if (toUserIndex !== -1) {
          state.accountUser[toUserIndex].friends.push(newFriendForFromUser);
        }

        // Cập nhật danh sách bạn bè của người gửi
        const fromUserIndex = state.accountUser.findIndex(
          (user) => user.id === fromUserId
        );
        if (fromUserIndex !== -1) {
          state.accountUser[fromUserIndex].friends.push(newFriendForToUser);
        }
      })
      .addCase(deleteFriendRequest.fulfilled, (state, action) => {
        state.friendRequests = state.friendRequests.filter(
          (request) => request.id !== action.payload
        );
      })
      // hàm cập nhật lại trạng thái
      .addCase(changeStatus.fulfilled, (state, action) => {
        const index = state.accountUser.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.accountUser[index] = action.payload;
        }
      });
  },
});

export default reducerAccount.reducer;
