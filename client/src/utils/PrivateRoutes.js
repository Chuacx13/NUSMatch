import React from 'react';
//import axios from 'axios';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
//import { useState, useEffect } from 'react';

//Prevent access to certain pages if users have not been authenticated
//Pages include all 'Profile', all 'Group', SearchResults and Chat page

function PrivateRoutes() {

    const [user] = useAuthState(auth);
    /*const userEmail = user.email;
    const [profile, setProfile] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async() => {
          try {
            const response = await axios.get(`http://localhost:3001/profile/${userEmail}`);
            if (response.data) {
              setProfile(true);
            }
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchUserProfile();
      }, []);*/

    return (
        user ? <Outlet /> : <Navigate to='/login' />
    )
};

export default PrivateRoutes