import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../../interfaces/page";
import { addGroup, renderGroup } from "../../services/group.service";

const state: Group[] = [];

const reducerGroups = createSlice({
  name: "reducerPost",
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

      .addCase(renderGroup.rejected, () => {});
  },
});

export default reducerGroups.reducer;
