import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './routes/router.jsx';
import { RouterProvider } from 'react-router'; 
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';

// Log environment variables for debugging
console.log('Environment:', {
  NODE_ENV: import.meta.env.MODE,
  API_URL: import.meta.env.VITE_API_URL,
  CLIENT_URL: import.meta.env.VITE_CLIENT_URL
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider 
        router={router}
        fallbackElement={<div className="text-center p-10">Loading...</div>}
      />
    </AuthProvider>
  </StrictMode>
);