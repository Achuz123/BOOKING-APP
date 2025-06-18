import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
const store = configureStore({
  reducer: {
    loader: loaderReducer, // this part of the state is called loader, and this function loaderReducer will control how it behaves.
  },
});

export default store;
