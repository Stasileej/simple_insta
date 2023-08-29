import { authReducer as authUser } from './authSlice';
import { allPostsReducer as allPosts } from './allPostsSlice';
import { modalComposerReducer as modalComposer } from './modalComposerSlice';
import { postIdReducer as postId } from './postIdSlice';
import { paginatorReducer as paginator } from './paginatorSlice';
import { currentPageReducer as currentPage } from './currentPageSlice';
import { paginatorHidingReducer as paginatorHiding } from './paginatorHidingSlice';

const rootReducer = {
  authUser,
  allPosts,
  modalComposer,
  postId,
  paginator,
  currentPage,
  paginatorHiding,
};

export default rootReducer;
