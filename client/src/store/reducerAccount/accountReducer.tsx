import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  renderUser,
  updateUser,
} from "../../services/account.service";
import { User } from "../../interfaces/page";

const state: User[] = [];

const reducerAccount = createSlice({
  name: "reducerAccount",
  initialState: {
    accountUser: state,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(renderUser.pending, (state, action) => {})
      // render User
      .addCase(renderUser.fulfilled, (state, action) => {
        state.accountUser = action.payload;
      })
      .addCase(renderUser.rejected, () => {})
      // Add new User
      .addCase(addUser.fulfilled, (state, action) => {
        state.accountUser.push(action.payload);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
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
