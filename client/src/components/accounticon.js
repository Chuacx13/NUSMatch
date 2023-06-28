import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Logout from './logout';
import { IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../styles/accounticon.css';

export const AccountIcon = () => {

    const [isOpen, setIsOpen] = useState(false);

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
        fontSize: 50
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

    return (
        <Link to='#' ref={menuRef}>
            <IconButton aria-label='Account' sx={iconButtonStyles} onClick={openMenu}> 
                <AccountCircleIcon sx={individualButtonStyles}/> 
                <div className={isOpen ? 'tooltip-close' : 'tooltip'}> Account </div>
                {isOpen && (
                <div className='dropdown-menu'>
                    <Link to='/profile' id="dropdown-option"> 
                        <Button variant='text' sx={profileIconStyle} startIcon={<PersonIcon/>}>
                            Profile 
                        </Button>
                    </Link>
                    <Link to='/group' id='dropdown-option'> 
                        <Button variant='text' sx={groupIconStyle} startIcon={<GroupIcon/>}>
                            Group
                        </Button>
                    </Link>
                    <Logout />
                </div>)}
            </IconButton>
        </Link>
    )
}

