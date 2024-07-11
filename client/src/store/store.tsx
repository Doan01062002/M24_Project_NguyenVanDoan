import { configureStore } from "@reduxjs/toolkit";
import reducerAccount from "./reducerAccount/accountReducer";
import reducerPost from "./reducerUsers/reducerPost";
import searchReducer from "./reducerUsers/searchSlice";
import accountAdminReducer from "./reducerAccount/accountAdminReducer";
import reducerGroup from "./reducerUsers/reducerGroup";

const store: any = configureStore({
  reducer: {
    users: reducerAccount,
    post: reducerPost,
    search: searchReducer,
    admin: accountAdminReducer,
    group: reducerGroup,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
