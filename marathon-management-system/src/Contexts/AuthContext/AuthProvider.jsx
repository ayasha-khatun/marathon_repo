import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Get API URL with fallback to default
  const API_URL = import.meta.env.VITE_API_URL || 'https://marathon-server-omega.vercel.app';

  // JWT Token Request Function
  const requestJWT = useCallback(async (email) => {
    try {
      const response = await fetch(`${API_URL}/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText || 'Unknown error'}`);
      }
      
      const data = await response.json();
      localStorage.setItem('access-token', data.token);
      return data.token;
    } catch (error) {
      console.error('JWT request failed:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'Failed to establish secure session. Please try again.',
      });
      throw error;
    }
  }, [API_URL]);

  // Validate token expiration
  const validateToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      const isTokenValid = decoded.exp * 1000 > Date.now();
      if (!isTokenValid) {
        localStorage.removeItem('access-token');
      }
      return isTokenValid;
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('access-token');
      return false;
    }
  }, []);

  // Create account with email/password
  const createUser = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await requestJWT(result.user.email);
      Swal.fire('Success!', 'Account created successfully', 'success');
      return result;
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire('Error!', error.message, 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [requestJWT]);

  // Sign in with email/password
  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await requestJWT(result.user.email);
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire('Error!', 'Invalid email or password', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [requestJWT]);

  // Google Sign in
  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await requestJWT(result.user.email);
      return result;
    } catch (error) {
      console.error('Google login failed:', error);
      Swal.fire('Error!', 'Google authentication failed', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [requestJWT]);

  // Logout
  const logOut = useCallback(async () => {
    try {
      setLoading(true);
      localStorage.removeItem('access-token');
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auth state management with token validation
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Check token validity
        const token = localStorage.getItem('access-token');
        const shouldRefreshToken = !token || !validateToken(token);
        
        if (shouldRefreshToken) {
          try {
            await requestJWT(currentUser.email);
          } catch (error) {
            console.error('Token refresh failed:', error);
            await logOut();
          }
        }
      } else {
        // Clear token if no user
        localStorage.removeItem('access-token');
      }
      
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [requestJWT, validateToken, logOut]);

  // Provide context values
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    requestJWT,
    validateToken
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;