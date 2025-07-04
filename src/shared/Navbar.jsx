import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";

const Navbar = () => {

  const {user, signOutUser  } = useAuth()

  const handleSignOut = () =>{
    
    signOutUser()
    .then(()=>{

    })
    .catch(error => {
      console.log(error);
    })

  }

  const navLinks = (
    <>
      <li>
        <NavLink className={({ isActive }) =>
          isActive
            ? " bg-secondary font-bold px-3  rounded-2xl  "
            : " group relative px-3"
        } to='/' >Home</NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) =>
          isActive
            ? " bg-secondary font-bold px-3  rounded-2xl  "
            : " group relative px-3"
        } to='/coverage' >Coverage</NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) =>
          isActive
            ? " bg-secondary font-bold px-3  rounded-2xl  "
            : " group relative px-3"
        } to='/sendParcel' >Send A Parcel</NavLink>
      </li>
        <li>
        <NavLink className={({ isActive }) =>
          isActive
            ? " bg-secondary font-bold px-3  rounded-2xl  "
            : " group relative px-3"
        } to='/rider' >Be a Rider</NavLink>
      </li>

      {
        user &&  <li>
        <NavLink className={({ isActive }) =>
          isActive
            ? " bg-secondary font-bold px-3  rounded-2xl  "
            : " group relative px-3"
        } to='/dashboard' >Dashboard</NavLink>
      </li>
      }

     
     
    </>
  );

  return (
    <div className="navbar lg:w-11/12 mx-auto py-4  bg-base-100 rounded-xl shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <div className="btn btn-ghost  text-sm">
            <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
    
      <div className="navbar-end flex items-center gap-2">
        {
          user &&  <div className="rounded-full object-cover size-11 avatar">
       <img className="rounded-full" src={user?.photoURL} alt="" />
     </div>
        }
        {
          user ? <button onClick={handleSignOut} className="btn bg-secondary" >Sign Out</button> : <Link to='/signin' ><button className="btn bg-secondary" >Sign In</button></Link>
        }
      </div>
    </div>
  );
};

export default Navbar;
