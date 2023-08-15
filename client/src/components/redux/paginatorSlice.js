import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paginator: {},
};

const paginatorSlice = createSlice({
  initialState,
  name: 'paginator',
  reducers: {
    setInfo: (state, data) => {
      state.paginator = data.payload;
    },
  },
});

export const paginatorActions = paginatorSlice.actions;
export const paginatorReducer = paginatorSlice.reducer;
