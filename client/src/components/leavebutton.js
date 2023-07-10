import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';

export const LeaveButton = ({ onClick }) => {

  const leaveButtonStyles = {
    fontSize: 30
  };

  const buttonStyles = {
    color: 'black',
    padding: '0px',
    fontSize: 30,
    transition: 'color 0.3s',
    '&:hover': { 
      color: 'rgb(180, 49, 49)', 
      backgroundColor: 'transparent'}
  };

  return (
    <Button variant='text' sx={buttonStyles} startIcon={<ExitToAppIcon style={leaveButtonStyles}/>} onClick={onClick}>
      Leave
    </Button>
  )
}
