import { Link, NavLink } from "react-router"; 
import { useContext, useState } from "react";
import { FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from './../../Contexts/AuthContext/AuthContext';
import logo from '../../assets/logo.png'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = (
    <>
      <li><NavLink to="/" className="hover:text-primary">Home</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/marathons" className="hover:text-primary">Marathons</NavLink></li>

          <li><NavLink to="/dashboard" className="hover:text-primary">Dashboard</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 bg-red" />
          <span className="text-xl font-bold text-yellow-600 dark:text-white">MarathonX</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium text-gray-700 dark:text-gray-200">
          {navLinks}

          {user && (
            <li className="relative group cursor-pointer">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="avatar"
                className="w-9 h-9 rounded-full border-2 border-gray-300 dark:border-white"
              />
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
              <button onClick={logOut} className="flex items-center gap-1 text-red-500">
                <FiLogOut /> Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700 dark:text-white">
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
                <li>
                  <button onClick={logOut} className="flex items-center gap-1 text-red-500">
                    <FiLogOut /> Logout
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border"
                    title={user.email}
                  />
                  <span className="text-sm">{user.displayName || user.email}</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="flex items-center gap-1 text-green-600">
                   Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="flex items-center gap-1 text-blue-600">
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
