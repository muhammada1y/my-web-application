// store/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {},
});

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
