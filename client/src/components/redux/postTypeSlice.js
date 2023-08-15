import { createSlice } from '@reduxjs/toolkit';
import { TYPE_POST_EDIT, TYPE_POST_EDIT_COMMENT, TYPE_POST_NEW, TYPE_POST_NEW_COMMENT } from '../data/apiData';

const initialState = {
  postType: '',
};

const postTypeSlice = createSlice({
  initialState,
  name: 'postType',
  reducers: {
    postTypeNew: (state) => {
      state.postType = TYPE_POST_NEW;
    },
    postTypeEdit: (state) => {
      state.postType = TYPE_POST_EDIT;
    },
    postTypeNewComment: (state) => {
      state.postType = TYPE_POST_NEW_COMMENT;
    },
    postTypeEditComment: (state) => {
      state.postType = TYPE_POST_EDIT_COMMENT;
    },
  },
});

export const postTypeActions = postTypeSlice.actions;
export const postTypeReducer = postTypeSlice.reducer;
