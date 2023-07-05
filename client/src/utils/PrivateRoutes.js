import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useProfileCreated } from '../hooks/useProfileCreated';

function PrivateRoutes() {

    const [user] = useAuthState(auth);
    const profileCreated = useProfileCreated(user?.email);

    return (
        user ? (
            profileCreated ? <Outlet /> : <Navigate to="/editprofile" />
          ) : (
            <Navigate to="/login" />
          )
    )
};

export default PrivateRoutes