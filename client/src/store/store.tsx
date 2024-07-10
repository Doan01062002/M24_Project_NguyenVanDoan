import { configureStore } from "@reduxjs/toolkit";
import reducerAccount from "./reducerAccount/accountReducer";
import reducerPost from "./reducerUsers/reducerPost";
import searchReducer from "./reducerUsers/searchSlice";
const store: any = configureStore({
  reducer: {
    users: reducerAccount,
    post: reducerPost,
    search: searchReducer,
  },
});

export default store;
