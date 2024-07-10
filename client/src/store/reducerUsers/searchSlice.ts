import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Post, Group } from "../../interfaces/page";

// Định nghĩa kiểu kết quả tìm kiếm
interface SearchResult {
  users: User[];
  posts: Post[];
  groups: Group[];
}

// Tìm kiếm tất cả các thực thể
export const searchAll:any = createAsyncThunk<SearchResult, string>(
  "search/searchAll",
  async (query: string) => {
    const [usersResponse, postsResponse, groupsResponse] = await Promise.all([
      axios.get(`http://localhost:3000/users?name_like=${query}`),
      axios.get(`http://localhost:3000/posts?content_like=${query}`),
      axios.get(`http://localhost:3000/groups?groupName_like=${query}`),
    ]);

    return {
      users: usersResponse.data,
      posts: postsResponse.data,
      groups: groupsResponse.data,
    };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: {
      users: [],
      posts: [],
      groups: []
    },
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAll.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default searchSlice.reducer;
