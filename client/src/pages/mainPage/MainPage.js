import classes from './MainPage.module.scss';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewEditPostBtn from '../../components/ui/newEditPost/NewEditPostBtn';
import CardList from '../../components/ui/cardList/CardList';
import ModalComposer from '../../components/ui/modal/ModalComposer/ModalComposer';
import Pagination from '../../components/ui/pagination/Pagination';

import useFetchAllPosts from '../../hooks/useFetchAllPosts';

import {
  allPostsSelector,
  authUserSelector,
  currentPageSelector,
  modalComposerSelector,
  paginatorHidingSelector,
  paginatorSelector,
} from '../../selectors/selectors';

const MainPage = () => {
  const { allPosts } = useSelector(allPostsSelector);
  const { visible: modal } = useSelector(modalComposerSelector);
  const { paginator } = useSelector(paginatorSelector);
  const { currentPage } = useSelector(currentPageSelector);
  const { paginatorHiding } = useSelector(paginatorHidingSelector);
  const { authUser } = useSelector(authUserSelector);

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
      {modal && <ModalComposer />}
      <CardList posts={allPosts} authUser={authUser} fetchAllPosts={fetchAllPosts} currentPage={currentPage} />
      {pagination}
    </div>
  );
};

export default MainPage;
