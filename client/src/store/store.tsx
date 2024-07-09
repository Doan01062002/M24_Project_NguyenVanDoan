import { configureStore } from "@reduxjs/toolkit";
import reducerAccount from "./reducerAccount/accountReducer";
import reducerPost from "./reducerUsers/reducerPost";

const store: any = configureStore({
  reducer: {
    users: reducerAccount,
    post: reducerPost,
  },
});

export default store;
