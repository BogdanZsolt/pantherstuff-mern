import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userAuth: null,
  },
  reducers: {
    isAuthenticated: (state, action) => {
      state.userAuth = action.payload;
    },
    logout: (state) => {
      state.userAuth = null;
    },
  },
});

export const { isAuthenticated, logout } = authSlice.actions;

export default authSlice.reducer;
