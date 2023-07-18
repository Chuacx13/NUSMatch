import React from 'react';
import axios from 'axios';
import Loading from '../pages/Loading';
import { useApiUrl } from '../hooks/useApiUrl';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useEffect, useState } from 'react';

//Check that user is authenticated and has set up their profile before they can gain access to NUSMatch's full features
function PrivateRoutes() {

    const [user, loading] = useAuthState(auth);
    const apiUrl = useApiUrl();
    const [profile, setProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${apiUrl}/profile/${user.email}`);
                setProfile(response.data);
            } catch (error) {
                console.error(error);
            } finally {
              if (!loading) {
                setIsLoading(false);
              }
            }
        };

        if (user.email) {
            fetchProfile(user.email);
        }
    }, [loading]);

    if (isLoading) {
      return <Loading />
    };

    return (
      user ? (
          profile ? <Outlet /> : <Navigate to="/editprofile" />
        ) : (
          <Navigate to="/login" />
        )
    )
};

export default PrivateRoutes