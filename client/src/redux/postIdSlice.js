import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postId: null,
};

const postIdSlice = createSlice({
  initialState,
  name: 'postId',
  reducers: {
    setPostId: (state, data) => {
      state.postId = data.payload;
    },
    resetPostId: (state) => {
      state.postId = null;
    },
  },
});

export const postIdActions = postIdSlice.actions;
export const postIdReducer = postIdSlice.reducer;
