// src/Components/DynamicTitle.jsx
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = 'MarathonPro'; 

    if (path === '/') title = 'Home | MarathonPro';
    else if (path === '/login') title = 'Login | MarathonPro';
    else if (path === '/register') title = 'Register | MarathonPro';
    else if (path === '/marathons') title = 'Marathons | MarathonPro';
    else if (path.includes('/dashboard')) title = 'Dashboard | MarathonPro';
    else if (path.includes('/marathon/')) title = 'Marathon Details | MarathonPro';
    else if (path.includes('/register-marathon/')) title = 'Register Marathon | MarathonPro';
    else title = 'Page Not Found | MarathonPro';

    document.title = title;
  }, [location]);

  return null;
};

export default DynamicTitle;
