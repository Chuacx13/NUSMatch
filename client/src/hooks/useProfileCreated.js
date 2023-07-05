import Loading from '../pages/Loading';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useApiUrl } from '../hooks/useApiUrl';


export const useProfileCreated = (email) => {
    const apiUrl = useApiUrl();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async (email) => {
        try {
            const response = await axios.get(`${apiUrl}/profile/${email}`);
            setProfile(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
        };

        if (email) {
            fetchProfile(email);
        }
    }, []);

    if (isLoading) {
        return <Loading />
    };

    return profile;
};

