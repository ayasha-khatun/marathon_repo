import { NavLink, Outlet } from 'react-router';
import { FiPlusCircle, FiList, FiHome, FiEdit } from 'react-icons/fi';

const DashboardLayouts = () => {

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5 bg-gray-100 dark:bg-gray-900 pt-15">
      {/* Sidebar */}
      <aside className="col-span-1 bg-white dark:bg-gray-800 p-4 shadow-md">

        <nav className="space-y-3 text-gray-700 dark:text-gray-200 text-sm font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-2 text-blue-600 font-semibold'
                : 'flex items-center gap-2 hover:text-blue-500'
            }
          >
            <FiHome /> Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/add-marathon"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-2 text-blue-600 font-semibold'
                : 'flex items-center gap-2 hover:text-blue-500'
            }
          >
            <FiPlusCircle /> Add Marathon
          </NavLink>

          <NavLink
            to="/dashboard/my-marathons"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-2 text-blue-600 font-semibold'
                : 'flex items-center gap-2 hover:text-blue-500'
            }
          >
            <FiList /> My Marathons
          </NavLink>

          <NavLink
            to="/dashboard/my-apply"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-2 text-blue-600 font-semibold'
                : 'flex items-center gap-2 hover:text-blue-500'
            }
          >
            <FiEdit /> My Apply List
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="col-span-1 md:col-span-4 bg-gray-50 dark:bg-gray-900 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;
