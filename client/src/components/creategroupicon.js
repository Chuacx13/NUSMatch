import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export const CreateGroupIcon = () => {

  const individualButtonStyles = {
    color: 'white', 
    fontSize: 50
  };

  const iconButtonStyles = {
    padding: '0px', 
    transition: 'backgroundColor 0.3s',
    '&:hover': { backgroundColor: 'transparent'}
  };

  return (
    <Link to='/creategroup'>
        <IconButton arial-label='CreateGroup' sx={iconButtonStyles}>
          <GroupsIcon sx={individualButtonStyles}/>
          <div className='tooltip'> Create Group </div>
        </IconButton>
    </Link>
  )
}