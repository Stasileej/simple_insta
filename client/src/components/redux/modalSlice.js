import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: false,
};

const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    modalOpen: (state) => {
      state.modal = true;
    },
    modalClose: (state) => {
      state.modal = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
