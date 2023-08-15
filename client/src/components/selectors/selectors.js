// import { useSelector } from 'react-redux';

// export const useAuthUser = () => {
//   return useSelector((state) => state.auth.authUser);
// };
export const authUserSelector = (state) => state.auth.authUser;

// export const usePostType = () => {
//   return useSelector((state) => state.postType.postType);
// };
export const postTypeSelector = (state) => state.postType.postType;

// export const useCommentId = () => {
//   return useSelector((state) => state.postId.postId);
// };
export const commentIdSelector = (state) => state.postId.postId;

// export const useAllPosts = () => {
//   return useSelector((state) => state.allPosts.allPosts);
// };
export const allPostsSelector = (state) => state.allPosts.allPosts;

// export const useModal = () => {
//   return useSelector((state) => state.modal.modal);
// };
export const modalSelector = (state) => state.modal.modal;

// export const useCurrentPage = () => {
//   return useSelector((state) => state.currentPage.currentPage);
// };
export const currentPageSelector = (state) => state.currentPage.currentPage;

// export const usePaginator = () => {
//   return useSelector((state) => state.paginator.paginator);
// };
export const paginatorSelector = (state) => state.paginator.paginator;

// export const usePaginatorHiding = () => {
//   return useSelector((state) => state.paginatorHiding.paginatorHiding);
// };
export const paginatorHidingSelector = (state) => state.paginatorHiding.paginatorHiding;