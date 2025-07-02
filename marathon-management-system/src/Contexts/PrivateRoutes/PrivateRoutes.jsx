import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './../AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem('access-token');

  // Define a simple spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  
  // Check token expiration
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('access-token');
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    } catch (err) {
      localStorage.removeItem('access-token');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default PrivateRoute;