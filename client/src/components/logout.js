import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Logout() {
    
    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate('/');
    }

    const dropDownStyle = {
        color: 'black',
        width: '100%',
        height: '100%',
        padding: 0,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        transition: 'backgroundColor 0.3s color 0.3s',
        '&:hover':{ backgroundColor: 'black', color: 'white'}
    };

    return (
    <Button variant='text' sx={dropDownStyle} startIcon={<LogoutIcon/>} onClick={logout}> 
        Log Out
    </Button>
    );
}

export default Logout;