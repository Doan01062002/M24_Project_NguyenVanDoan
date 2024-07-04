import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/page";
import { addUser, renderUser } from "../../services/account.service";

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
      });
  },
});

export default reducerAccount.reducer;
