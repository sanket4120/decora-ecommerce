import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/authContext';

const AuthRequired = ({ children }) => {
  const location = useLocation();
  const { authState } = useUser();

  return authState.isAuthenticated ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location.pathname }} />
  );
};

export default AuthRequired;
