import './App.css';

import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import Login from './components/pages/login/Login';
import MainPage from './components/pages/mainPage/MainPage';
import Header from './components/UI/header/Header';
import Logout from './components/pages/logout/Logout';
import NotFound from './components/pages/notFound/NotFound';

import { useAuthUser } from './components/hooks/selectors';
import { routes } from './components/data/routes';

function App() {
  const authUser = useAuthUser();
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
