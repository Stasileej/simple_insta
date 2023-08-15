import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paginatorHiding: false,
};

const paginatorHidingSlice = createSlice({
  initialState,
  name: 'paginatorHiding',
  reducers: {
    paginatorShow: (state) => {
      state.paginatorHiding = false;
    },
    paginatorHide: (state) => {
      state.paginatorHiding = true;
    },
  },
});

export const paginatorHidingActions = paginatorHidingSlice.actions;
export const paginatorHidingReducer = paginatorHidingSlice.reducer;
