import { Link, NavLink } from "react-router"; // Fixed import
import { useContext, useState, useEffect } from "react";
import { FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from './../../Contexts/AuthContext/AuthContext';
import logo from '../../assets/logo.png';
import Swal from 'sweetalert2'; // Added for logout confirmation
// import { LuSun } from "react-icons/lu";
// import { LuMoon } from "react-icons/lu";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Added for scroll 
  // const [theme, setTheme] =useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Enhanced logout function with confirmation
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out from your account?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out'
    });

    if (confirm.isConfirmed) {
      try {
        await logOut();
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          timer: 1500
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Failed to log out',
          icon: 'error'
        });
      }
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `hover:text-primary ${isActive ? 'text-yellow-600 font-bold' : ''}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `hover:text-primary ${isActive ? 'text-yellow-600 font-bold' : ''}`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
  <NavLink
    to="/blog"
    className={({ isActive }) =>
      `hover:text-yellow-600 ${isActive ? "text-yellow-600 font-semibold" : ""}`
    }
  >
    Blog
  </NavLink>
</li>
      {user && (
        <>
          <li>
            <NavLink 
              to="/marathons" 
              className={({ isActive }) => 
                `hover:text-primary ${isActive ? 'text-yellow-600 font-bold' : ''}`
              }
            >
              Marathons
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `hover:text-primary ${isActive ? 'text-yellow-600 font-bold' : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className={` bg-white dark:bg-gray-900 shadow-md fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-2' : 'py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10" />
          <span className="text-xl font-bold text-yellow-600 dark:text-white">MarathonX</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium text-gray-700 dark:text-gray-200">
          {navLinks}
          <DarkMode></DarkMode>

          {/* <div className="bg-zinc-100 dark:bg-zinc-700 rounded-xl
          ">
            <button
            className="p-2  dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={ () =>{
              setTheme("");
            }}
            title="Toggle Theme">
            <LuSun />
          </button>
          <button
            className="p-2  dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={ () =>{
              setTheme("dark");
            }}
            title="Toggle Theme">
            <LuMoon />
          </button>
          </div> */}

          {user && (
            <li className="relative group flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-gray-300 dark:border-white"
                />
                
              </div>
              <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {user.email}
              </div>
            </li>
          )}

          {!user && (
            <>
              <li>
                <NavLink to="/login" className="btn btn-primary flex items-center gap-1 text-white">
                   Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="btn btn-outline-primary flex items-center gap-1 text-blue-600">
                  Register
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <li>
              <button onClick={handleLogout} className="flex btn btn-outline items-center gap-1 text-red-500">
                <FiLogOut /> Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-2xl text-gray-700 dark:text-white"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-3">
          <ul className="space-y-3 text-gray-700 dark:text-gray-200">
            {navLinks}

            {user ? (
              <>
                <li className="pt-4 border-t mt-4">
                  <button onClick={handleLogout} className="flex btn btn-ghost items-center gap-1 text-red-500 w-full">
                    <FiLogOut /> Logout
                  </button>
                </li>
                <li className="flex items-center gap-2 pt-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border"
                  />
                  <div>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="flex items-center justify-center gap-1 btn btn-primary text-white w-full">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="flex items-center justify-center gap-1 btn btn-outline text-blue-500 w-full">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};
export default Navbar;