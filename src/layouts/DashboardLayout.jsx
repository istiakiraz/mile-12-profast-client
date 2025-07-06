import React, { useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from "../shared/Logo";
import { FaBox, FaHistory, FaHome, FaSearchLocation, FaUserCheck, FaUserClock, FaUserEdit } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {

  const { role , roleLoading} = useUserRole()

  
    const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null); // ✅ drawer toggle ref

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    if (drawerRef.current) {
      drawerRef.current.checked = !drawerRef.current.checked;
    }
  };
 


    return (
        <div>
            <div className="drawer lg:drawer-open">
   <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerRef} // ✅ attached ref
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 lg:hidden w-full">
          <div className="flex-none">
            <button
              onClick={toggleDrawer}
              className="btn btn-square btn-ghost"
              aria-label="Toggle sidebar"
            >
              <div className="flex flex-col items-center justify-center w-10 h-10 space-y-1.5">
                <span
                  className={`w-8 h-1 bg-secondary transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-8 h-1 bg-primary rounded transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`w-8 h-1 bg-secondary  transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
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

{!roleLoading && role === "admin" &&
  <>
  <li>
  <NavLink to='/dashboard/activeRider' className="flex items-center gap-2">
    <FaUserCheck color='green' className="text-lg" />
    Active Rider
  </NavLink>
</li>

<li>
  <NavLink to='/dashboard/pendingRider' className="flex items-center gap-2">
    <FaUserClock color='red' className="text-lg" />
    Pending Rider
  </NavLink>
</li>
<li>
  <NavLink to='/dashboard/assignRider' className="flex items-center gap-2">
    <FaUserClock color='purple' className="text-lg" />
    Assign Ride
  </NavLink>
</li>

<li>
  <NavLink to='/dashboard/makeAdmin' className="flex items-center gap-2">
    <FaUserClock  className="text-lg" />
    Make Admin
  </NavLink>
</li>
  
  
  </>
}
    </ul>
  </div>
</div>
        </div>
    );
};

export default DashboardLayout;