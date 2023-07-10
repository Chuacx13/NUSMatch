import React from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const RequestButton = () => {

  const navigate = useNavigate();

  const requestButtonStyles = {
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

  const goToRequests = () => {
    navigate('/requests');
  };

  return (
    <Button variant='text' sx={buttonStyles} startIcon={<GroupAddIcon style={requestButtonStyles}/>} onClick={goToRequests}>
      Group Requests
    </Button>
  )
}