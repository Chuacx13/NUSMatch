import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

//Prevent access to certain pages if users are already authenticated
//Pages include Login and Register page

const PublicRoutes = () => {

    const [user] = useAuthState(auth);

    return (
        user ? <Navigate to='/' /> : <Outlet />
    )
};

export default PublicRoutes