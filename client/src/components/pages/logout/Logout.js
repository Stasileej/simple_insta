import classes from './Logout.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { authActions } from '../../redux/authSlice';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';
import { authUserSelector, currentPageSelector } from '../../selectors/selectors';

import Button from '../../UI/dumbComponents/Button';

const text = {
  user: 'User',
  logoutBtn: 'Logout',
  back: 'go back',
};

const Logout = () => {
  const authUser = useSelector(authUserSelector);
  const currentPage = useSelector(currentPageSelector);

  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    if (authUser) {
      dispatch(authActions.logout());
    }
    fetchAllPosts(currentPage);
  }, [authUser, currentPage, dispatch, fetchAllPosts]);

  return (
    <div className={classes.logoutPage}>
      <h4>
        {text.user} {authUser}
      </h4>
      <Button onClick={logoutHandler}>{text.logoutBtn}</Button>
      <NavLink to='/'>{text.back}</NavLink>
    </div>
  );
};

export default Logout;
