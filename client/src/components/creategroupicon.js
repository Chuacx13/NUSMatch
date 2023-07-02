import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CreateGroupIcon = () => {

  const navigate = useNavigate();

  const individualButtonStyles = {
    color: 'white', 
    fontSize: 50
  };

  const iconButtonStyles = {
    padding: '0px', 
    transition: 'backgroundColor 0.3s',
    '&:hover': { backgroundColor: 'transparent'}
  };

  const goToCreateGroup = () => {
    navigate('/creategroup');
  };

  return (
    <IconButton className='link' arial-label='CreateGroup' sx={iconButtonStyles} onClick={goToCreateGroup}>
      <GroupsIcon sx={individualButtonStyles}/>
      <div className='tooltip'> Create Group </div>
    </IconButton>
  )
}