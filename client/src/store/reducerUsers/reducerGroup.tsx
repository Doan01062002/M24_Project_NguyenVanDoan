import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../../interfaces/page";
import {
  addGroup,
  changeStatus,
  renderGroup,
} from "../../services/group.service";

const state: Group[] = [];

const reducerGroups = createSlice({
  name: "reducerGroup",
  initialState: {
    groups: state,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // render Groups
      .addCase(renderGroup.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      // add Groups
      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      // hàm cập nhật lại trạng thái
      .addCase(changeStatus.fulfilled, (state, action) => {
        const index = state.groups.findIndex(
          (group) => group.id === action.payload.id
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
      })
      .addCase(renderGroup.rejected, () => {});
  },
});

export default reducerGroups.reducer;
