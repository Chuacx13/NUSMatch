import React from 'react';
import axios from 'axios';
import Loading from '../pages/Loading';
import { useApiUrl } from '../hooks/useApiUrl';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { useEffect, useState } from 'react';

//Check that user is a member of the group before they gain access to certain pages
//Pages include Schedule and IndivGroupChat page
function GroupMemberRoutes() {

    const [user, loading] = useAuthState(auth);
    const apiUrl = useApiUrl();
    const [isMember, setIsMember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const groupId = localStorage.getItem('groupId');

        const fetchIsGroupMember = async () => {
            try {
                const response = await axios.get(`${apiUrl}/group/other/${groupId}`);
                setIsMember(response.data.members.includes(user.email));
            } catch (error) {
                console.error(error);
            } finally {
              if (!loading) {
                setIsLoading(false);
              }
            }
        };

        if (user.email) {
            fetchIsGroupMember(user.email);
        }
    }, [loading]);

    if (isLoading) {
        return <Loading />
    };

    return (
        isMember ? <Outlet /> : <Navigate to='/groupdetails' />
    )
}

export default GroupMemberRoutes