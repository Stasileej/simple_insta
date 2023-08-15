import { createSlice } from '@reduxjs/toolkit';

export const AUTH_USER = 'authUser';

const initialState = {
  authUser: localStorage.getItem(AUTH_USER) || '',
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    login: (state, data) => {
      state.authUser = data.payload;
    },
    logout: (state) => {
      state.authUser = '';
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
