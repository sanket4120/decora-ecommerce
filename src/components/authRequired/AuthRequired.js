import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../../context/userContext';

const AuthRequired = () => {
  const location = useLocation();
  const { authState } = useUser();

  return authState.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location.pathname }} />
  );
};

export default AuthRequired;
