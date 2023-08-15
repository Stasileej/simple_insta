import classes from './MainPage.module.css';

import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import NewEditPostBtn from '../../cta/newEditPost/NewEditPostBtn';
import SearchFilterForm from '../../Forms/searchFilterForm/SearchFilterForm';
import CardList from '../../UI/cardList/CardList';
import NewEditPost from '../../UI/newEditPost/NewEditPost';
import Pagination from '../../UI/pagination/Pagination';

import { useAllPosts, useAuthUser, useCurrentPage, useModal, usePaginator, usePaginatorHiding, usePostType } from '../../hooks/selectors';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';

const MainPage = () => {
  const allPosts = useAllPosts();
  const modal = useModal();
  const postType = usePostType();
  const paginator = usePaginator();
  const currentPage = useCurrentPage();
  const fetchAllPosts = useFetchAllPosts();
  const paginatorHiding = usePaginatorHiding();
  const authUser = useAuthUser();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllPosts(currentPage);
  }, [currentPage, fetchAllPosts, dispatch]);
  const pagination = useMemo(
    () => !paginatorHiding && paginator.totalPages !== 0 && <Pagination />,
    [paginator.totalPages, paginatorHiding]
  );

  return (
    <div className={classes.mainPage}>
      <NewEditPostBtn />
      {modal && <NewEditPost type={postType} />}
      <SearchFilterForm />
      <CardList posts={allPosts} authUser={authUser} fetchAllPosts={fetchAllPosts} currentPage={currentPage} />
      {pagination}
    </div>
  );
};

export default MainPage;
