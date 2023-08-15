import classes from './SearchFilterForm.module.css';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { allPostsActions } from '../../redux/allPostsSlice';
import { paginatorHidingActions } from './../../redux/paginatorHidingSlice';
import Form from '../../UI/dumbComponents/Form';
import Input from '../../UI/dumbComponents/Input';
import { searchPostsFetch } from '../../data/requestsAPI';
import { useCurrentPage } from '../../hooks/selectors';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';

const formData = {
  inputType: `text`,
  inputPlaceholder: `search / filter`,
};

const SearchFilterForm = () => {
  const [searchValue, setSearchValue] = useState('');

  const currentPage = useCurrentPage();
  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();

  const searchInputHandler = useCallback((event) => {
    setSearchValue(event.target.value.trim());
  }, []);

  useEffect(() => {
    const getSearchResult = setTimeout(() => {
      if (searchValue.trim().length > 0) {
        const fetchAllPosts = async () => {
          const loadedPosts = await searchPostsFetch(searchValue);

          dispatch(allPostsActions.getPosts(loadedPosts));
          dispatch(paginatorHidingActions.paginatorHide());
        };

        fetchAllPosts();
      }
      if (searchValue.trim().length === 0) {
        dispatch(paginatorHidingActions.paginatorShow());
        
        fetchAllPosts(currentPage);
      }
    }, 1500);

    return () => clearTimeout(getSearchResult);
  }, [searchValue, fetchAllPosts, currentPage, dispatch]);

  return (
    <Form className={classes.searchForm}>
      <Input type={formData.inputType} placeholder={formData.inputPlaceholder} onChange={searchInputHandler} />
    </Form>
  );
};

export default SearchFilterForm;
