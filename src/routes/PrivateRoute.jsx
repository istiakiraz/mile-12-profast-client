import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();


     const location = useLocation()

    if(loading){
        return <div className='text-secondary' >
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }

    if(!user){
        
         return <Navigate state={location.pathname} to='/signin'></Navigate>
    }


    return children;
};

export default PrivateRoute;