import classes from './Header.module.css';

import { NavLink } from 'react-router-dom';

import { useAuthUser } from '../../hooks/selectors';
import { routes } from '../../data/routes';
import { useMemo } from 'react';

const headerTextContent = {
  title: 'ReactApp',
  logout: 'logout',
  login: 'login',
};

const Header = () => {
  const authUser = useAuthUser();
  const mainPageLinkText = useMemo(() => (!!authUser ? authUser : headerTextContent.title), [authUser]);
  const loginLogoutLinkText = useMemo(
    () =>
      !!authUser
        ? { route: routes.logoutPage, loginLogout: headerTextContent.logout }
        : { route: routes.loginPage, loginLogout: headerTextContent.login },
    [authUser]
  );
  return (
    <div className={classes.header}>
      <NavLink to='/'>
        <h3>{mainPageLinkText}</h3>
      </NavLink>
      <NavLink to={loginLogoutLinkText.route}>{loginLogoutLinkText.loginLogout}</NavLink>
    </div>
  );
};

export default Header;
