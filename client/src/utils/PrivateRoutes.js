import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

//Prevent access to certain pages if users are not authenticated
//Pages include Profile, Group, SearchResults and Chat page

const PrivateRoutes = () => {

    const [user] = useAuthState(auth);

    return (
        user ? <Outlet /> : <Navigate to='/login' />
    )
};

export default PrivateRoutes