import classes from './Logout.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { authActions } from '../../redux/authSlice';
import { AUTH_USER } from '../../data/apiData';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';
import { authUserSelector, currentPageSelector } from '../../selectors/selectors';

import Button from '../../UI/dumbComponents/Button';

const logoutText = {
  user: 'User',
  logoutBtn: 'Logout',
  back: 'go back',
};

const Logout = () => {
  const authUser = useSelector(authUserSelector);
  const currentPage = useSelector(currentPageSelector);

  const fetchAllPosts = useFetchAllPosts();

  const dispatch = useDispatch();

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logoutHandler = useCallback(() => {
    setIsLoggedOut(true);
  }, []);

  useEffect(() => {
    if (isLoggedOut) {
      dispatch(authActions.logout());
      localStorage.removeItem(AUTH_USER);
      setIsLoggedOut(false);
    }
    fetchAllPosts(currentPage);
  }, [currentPage, dispatch, fetchAllPosts, isLoggedOut]);

  return (
    <div className={classes.logoutPage}>
      <h4>
        {logoutText.user} {authUser}
      </h4>
      <Button onClick={logoutHandler}>{logoutText.logoutBtn}</Button>
      <NavLink to='/'>{logoutText.back}</NavLink>
    </div>
  );
};

export default Logout;
