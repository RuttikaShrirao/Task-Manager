import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../assets/Data";
// console.log(user)
// const user=""
const initialState = {
  user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : user,
  isSidebarOpen: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      console.log(state.user,"action", action.payload)
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;