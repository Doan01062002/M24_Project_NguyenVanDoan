import { configureStore } from "@reduxjs/toolkit";
import reducerAccount from "./reducerAccount/accountReducer";
import reducerPost from "./reducerUsers/reducerUser";

const store: any = configureStore({
  reducer: {
    users: reducerAccount,
    post: reducerPost,
  },
});

export default store;
