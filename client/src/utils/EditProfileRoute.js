import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

//Check that only authenticated users can have access to the EditProfile page
function EditProfileRoute() {

    const [user] = useAuthState(auth);

    return (
        user ? <Outlet /> : <Navigate to='/login' />
    )
};

export default EditProfileRoute