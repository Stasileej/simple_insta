import classes from './Logout.module.css';

import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { authActions } from '../../redux/authSlice';
import { AUTH_USER } from '../../data/apiData';

import { useAuthUser, useCurrentPage } from '../../hooks/selectors';
import Button from '../../UI/dumbComponents/Button';
import useFetchAllPosts from '../../hooks/useFetchAllPosts';
import { NavLink } from 'react-router-dom';

const logoutText = {
  user: 'User',
  logoutBtn: 'Logout',
  back: 'go back',
};

const Logout = () => {
  const authUser = useAuthUser();
  const currentPage = useCurrentPage();
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