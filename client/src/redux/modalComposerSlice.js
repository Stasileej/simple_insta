import { createSlice } from '@reduxjs/toolkit';

import { MODE_EDIT, MODE_NEW, TYPE_COMMENT, TYPE_POST } from '../data/apiData';

const text = {
  newPost: 'Create new post',
  editPost: 'Edit post',
  newComment: 'Create new comment',
  editComment: 'Edit comment',
};

const initialState = {
  visible: false,
  type: '',
  mode: '',
  output: {
    header: '',
    component: null,
  },
};

const modalComposerSlice = createSlice({
  initialState,
  name: 'modalComposer',
  reducers: {
    setModalContent: (state, action) => {
      const { type, mode } = action.payload;

      let header = '';
      let component = null;

      if (type === TYPE_POST) {
        header = mode === MODE_NEW ? text.newPost : text.editPost;
        component = mode === MODE_NEW || mode === MODE_EDIT ? 'PostForm' : null;
      } else if (type === TYPE_COMMENT) {
        header = mode === MODE_NEW ? text.newComment : text.editComment;
        component = mode === MODE_NEW || mode === MODE_EDIT ? 'CommentForm' : null;
      }

      state.visible = true;
      state.type = type;
      state.mode = mode;
      state.output = { header, component };
    },
    
    closeModal: (state) => {
      state.visible = false;
      state.type = '';
      state.mode = '';
      state.output = {
        header: '',
        component: null,
      };
    },
  },
});

export const modalComposerActions = modalComposerSlice.actions;
export const modalComposerReducer = modalComposerSlice.reducer;
