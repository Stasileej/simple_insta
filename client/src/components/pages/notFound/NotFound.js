import { Navigate } from 'react-router';
import { routes } from '../../data/routes';

const NotFound = () => {
  return <Navigate to={routes.mainPage} />;
};

export default NotFound;
