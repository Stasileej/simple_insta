import { createSlice } from '@reduxjs/toolkit';

const AUTH_USER = 'authUser';

const initialState = {
  authUser: localStorage.getItem(AUTH_USER) || '',
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    login: (state, action) => {
      state.authUser = action.payload;
      localStorage.setItem(AUTH_USER, action.payload);
    },
    logout: (state) => {
      state.authUser = '';
      localStorage.removeItem(AUTH_USER);
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
