import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
};

const currentPageSlice = createSlice({
  initialState,
  name: 'currentPage',
  reducers: {
    setPage: (state, data) => {
      state.currentPage = data.payload;
    },
  },
});

export const currentPageActions = currentPageSlice.actions;
export const currentPageReducer = currentPageSlice.reducer;
