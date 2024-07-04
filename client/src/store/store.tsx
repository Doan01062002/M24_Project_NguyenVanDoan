import { configureStore } from "@reduxjs/toolkit";
import reducerAccount from "./reducerAccount/accountReducer";

const store: any = configureStore({
  reducer: {
    users: reducerAccount,
  },
});

export default store;
