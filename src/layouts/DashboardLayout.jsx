import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from "../shared/Logo";
import { FaBox, FaHistory, FaHome, FaSearchLocation, FaUserEdit } from 'react-icons/fa';

const DashboardLayout = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">

        {/* Navbar */}
    <div className="navbar bg-base-300 lg:hidden w-full">
      <div className="flex-none ">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 lg:hidden px-2">Dashboard</div>
     
    </div>
    {/* Page content here */}
    <Outlet></Outlet>
  

    {/* Page content here */}
    
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
     <li className='mb-3'> <Logo></Logo></li>
      <li>
  <NavLink to='/' className="flex items-center gap-2">
    <FaHome /> Home
  </NavLink>
</li>
<li>
  <NavLink to='/dashboard/myparcels' className="flex items-center gap-2">
    <FaBox /> My Parcels
  </NavLink>
</li>
<li>
  <NavLink to='/dashboard/payment_history' className="flex items-center gap-2">
    <FaHistory /> Payment History
  </NavLink>
</li>
<li>
  <NavLink to='/dashboard/track' className="flex items-center gap-2">
    <FaSearchLocation /> Track a Package
  </NavLink>
</li>
<li>
  <NavLink to='/dashboard/profile' className="flex items-center gap-2">
    <FaUserEdit /> Update Profile
  </NavLink>
</li>
    </ul>
  </div>
</div>
        </div>
    );
};

export default DashboardLayout;