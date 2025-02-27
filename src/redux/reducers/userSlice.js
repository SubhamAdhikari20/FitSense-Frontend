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
            state.currentUser = action.payload.user;    // user object must include a 'role' property
            localStorage.setItem("fitsense-app-token", action.payload.token);
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("fitsense-app-token");
        },
        updateProfilePictureSuccess: (state, action) => {
            if (state.currentUser) {
                state.currentUser.profilePicture = action.payload;
            }
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            localStorage.removeItem("fitsense-app-token");
        },
    },
});

export const { registerSuccess, loginSuccess, logout, deleteUserSuccess, updateProfilePictureSuccess} = userSlice.actions;

export default userSlice.reducer;