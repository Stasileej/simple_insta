import { allPostsReducer } from './allPostsSlice';
import { authReducer } from './authSlice';
import { currentPageReducer } from './currentPageSlice';
import { modalComposerReducer } from './modalComposerSlice';
import { paginatorHidingReducer } from './paginatorHidingSlice';
import { paginatorReducer } from './paginatorSlice';
import { postIdReducer } from './postIdSlice';

const rootReducer = {
  auth: authReducer,
  allPosts: allPostsReducer,
  modalComposer: modalComposerReducer,
  postId: postIdReducer,
  paginator: paginatorReducer,
  currentPage: currentPageReducer,
  paginatorHiding: paginatorHidingReducer,
};

export default rootReducer;
