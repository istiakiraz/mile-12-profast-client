import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading } = useUserRole();

    if(loading || roleLoading){
        return <div className='text-secondary' >
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }

    if(!user || role !== "admin"){
        return <Navigate  to='/forbidden'></Navigate>
    }


    return children
};

export default AdminRoute;