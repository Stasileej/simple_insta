import classes from './MainPage.module.css';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewEditPostBtn from '../../cta/newEditPost/NewEditPostBtn';
import SearchFilterForm from '../../Forms/searchFilterForm/SearchFilterForm';
import CardList from '../../UI/cardList/CardList';
import ModalComposer from '../../UI/ModalComposer/ModalComposer';
import Pagination from '../../UI/pagination/Pagination';

import useFetchAllPosts from '../../hooks/useFetchAllPosts';

import {
  allPostsSelector,
  authUserSelector,
  currentPageSelector,
  modalSelector,
  paginatorHidingSelector,
  paginatorSelector,
  postTypeSelector,
} from '../../selectors/selectors';

const MainPage = () => {
  const allPosts = useSelector(allPostsSelector);
  const modal = useSelector(modalSelector);
  const postType = useSelector(postTypeSelector);
  const paginator = useSelector(paginatorSelector);
  const currentPage = useSelector(currentPageSelector);
  const paginatorHiding = useSelector(paginatorHidingSelector);
  const authUser = useSelector(authUserSelector);
  
  const fetchAllPosts = useFetchAllPosts();

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
      {modal && <ModalComposer type={postType} />}
      <SearchFilterForm />
      <CardList posts={allPosts} authUser={authUser} fetchAllPosts={fetchAllPosts} currentPage={currentPage} />
      {pagination}
    </div>
  );
};

export default MainPage;
