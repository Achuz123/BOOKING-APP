import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer, // tell the prgm that this part of the state is called loader, and this function loaderReducer will control how it behaves.
  },
});

export default store;
