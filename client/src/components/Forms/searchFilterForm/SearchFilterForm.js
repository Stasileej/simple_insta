import classes from './SearchFilterForm.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { allPostsActions } from '../../../redux/allPostsSlice';
import { paginatorHidingActions } from './../../../redux/paginatorHidingSlice';
import Form from '../../ui/dumbComponents/Form';
import Input from '../../ui/dumbComponents/Input';
import { searchPostsFetch } from '../../../data/requestsAPI';
import useFetchAllPosts from '../../../hooks/useFetchAllPosts';
import { currentPageSelector } from '../../../selectors/selectors';

const formData = {
  inputType: `text`,
  inputPlaceholder: `search / filter`,
};

const SearchFilterForm = () => {
  const [searchValue, setSearchValue] = useState('');

  const { currentPage } = useSelector(currentPageSelector);
  
  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();

  const searchInputHandler = useCallback((event) => { setSearchValue(event.target.value.trim()); }, []);

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
