import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            localStorage.setItem("fitsense-app-token", action.payload.token);
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            localStorage.setItem("fitsense-app-token", action.payload.token);
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("fitsense-app-token");
        },
    },
});

export const { registerSuccess, loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;