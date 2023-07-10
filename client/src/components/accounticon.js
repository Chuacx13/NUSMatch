import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Logout from './logout';
import { IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../styles/accounticon.css';

export const AccountIcon = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const openMenu = () => {
        setIsOpen(!isOpen);
    };

    let menuRef = useRef();

    useEffect(() => {

        let closeMenu = (e) => {
            if(!menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', closeMenu);
        
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        }
    });

    const individualButtonStyles = {
        color: 'white', 
        fontSize: 50,
        transition: 'color 0.3s',
        '&:hover': { color: 'rgb(220, 125, 24)'}
    };

    const iconButtonStyles = {
        padding: '0px', 
        transition: 'backgroundColor 0.3s',
        '&:hover': { backgroundColor: 'transparent'}
    };

    const profileIconStyle = {
        color: 'black',
        width: '100%',
        height: '100%',
        padding: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        transition: 'backgroundColor 0.3s color 0.3s',
        '&:hover':{ backgroundColor: 'black', color: 'white'}
    };

    const groupIconStyle = {
        color: 'black',
        width: '100%',
        height: '100%',
        padding: 0,
        transition: 'backgroundColor 0.3s color 0.3s',
        '&:hover':{ backgroundColor: 'black', color: 'white'}
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    const goToGroup = () => {
        navigate('/group');
    };

    return (
        <IconButton className='link' aria-label='Account' sx={iconButtonStyles} onClick={openMenu} ref={menuRef}> 
            <AccountCircleIcon sx={individualButtonStyles}/> 
            <div className={isOpen ? 'tooltip-close' : 'tooltip'}> Account </div>
            {isOpen && (
            <div className='dropdown-menu'>
                <div id="dropdown-option"> 
                    <Button variant='text' sx={profileIconStyle} startIcon={<PersonIcon/>} onClick={goToProfile}>
                        Profile 
                    </Button>
                </div>
                <div id='dropdown-option'> 
                    <Button variant='text' sx={groupIconStyle} startIcon={<GroupIcon/>} onClick={goToGroup}>
                        Group
                    </Button>
                </div>
                <Logout />
            </div>)}
        </IconButton>
    )
}

