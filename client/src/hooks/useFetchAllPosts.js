import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { allPostsFetch } from '../data/requestsAPI';
import { allPostsActions } from '../redux/allPostsSlice';
import { paginatorActions } from '../redux/paginatorSlice';

const useFetchAllPosts = () => {
  const dispatch = useDispatch();

  const fetchAllPosts = useCallback(
    async (currentPage) => {
      const response = await allPostsFetch(currentPage);

      dispatch(allPostsActions.getPosts(response.loadedPosts));
      dispatch(paginatorActions.setInfo(response.paginatorInfo));
    },
    [dispatch]
  );

  return fetchAllPosts;
};

export default useFetchAllPosts;
