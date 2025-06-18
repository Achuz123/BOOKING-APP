// the spinnning loading thingg

import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",

  initialState: {
    loading: true,
  },
  //showLoading is basically a function is bascially a fuction that sets the state to truw or false
  reducers: {
    showLoading: (state) => {
      // state here refers to loading:false  .THE WHOLE OBJECT
      state.loading = true; //state here refers to the boolean value
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
