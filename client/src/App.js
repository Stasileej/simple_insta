import './App.scss';

import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import Login from './pages/login/Login';
import MainPage from './pages/mainPage/MainPage';
import Header from './components/ui/header/Header';
import Logout from './pages/logout/Logout';
import NotFound from './pages/notFound/NotFound';
import { authUserSelector } from './selectors/selectors';

import { routes } from './data/routes';

function App() {
  const { authUser } = useSelector(authUserSelector);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.loginPage} element={!authUser && <Login />} />
        <Route path={routes.logoutPage} element={authUser && <Logout />} />
        <Route path={routes.mainPage} element={<MainPage />} />
        <Route path={routes.anyPage} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
