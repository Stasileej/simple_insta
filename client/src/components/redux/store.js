import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { allPostsReducer } from './allPostsSlice';
import { authReducer } from './authSlice';
import { currentPageReducer } from './currentPageSlice';
import { modalReducer } from './modalSlice';
import { paginatorHidingReducer } from './paginatorHidingSlice';
import { paginatorReducer } from './paginatorSlice';
import { postIdReducer } from './postIdSlice';
import { postTypeReducer } from './postTypeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allPosts: allPostsReducer,
    modal: modalReducer,
    postType: postTypeReducer,
    postId: postIdReducer,
    paginator: paginatorReducer,
    currentPage: currentPageReducer,
    paginatorHiding: paginatorHidingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});
