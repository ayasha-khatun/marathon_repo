import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const JwtRefreshHandler = ({ children }) => {
  const { user, requestJWT } = useContext(AuthContext); // Fixed: using useContext
  const location = useLocation();

  useEffect(() => {
    if (user) {
      // Refresh token on route change with error handling
      requestJWT(user.email)
        .then(() => {
          console.log('Token refreshed successfully');
        })
        .catch((error) => {
          console.error('Token refresh failed:', error);
          // Add additional error handling if needed
        });
    }
  }, [location.pathname, user, requestJWT]);

  return children;
};

export default JwtRefreshHandler;