import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPosts: [],
};

const allPostsSlice = createSlice({
  initialState,
  name: 'allPosts',
  reducers: {
    getPosts: (state, data) => {
      state.allPosts = data.payload;
    },
  },
});

export const allPostsActions = allPostsSlice.actions;
export const allPostsReducer = allPostsSlice.reducer;
