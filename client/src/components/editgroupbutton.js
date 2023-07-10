import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const EditGroupButton = () => {

  const navigate = useNavigate();

  const editButtonStyles = {
    fontSize: 30
  };

  const buttonStyles = {
    color: 'black',
    padding: '0px',
    fontSize: 30,
    transition: 'color 0.3s',
    '&:hover': { 
      color: 'rgb(220, 125, 24)',
      backgroundColor: 'transparent'}
  };

  const goToEditGroup = () => {
    navigate('/editgroup');
  };

  return (
    <Button variant='text' sx={buttonStyles} startIcon={<EditIcon style={editButtonStyles}/>} onClick={goToEditGroup}>
      Edit Group
    </Button>
  )
}

