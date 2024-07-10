import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, Post, Group } from "../interfaces/page";

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
