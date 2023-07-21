import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import { IconButton } from '@mui/material';

export const GroupAppIcon = ({ onClick }) => {

  const appIconStyle = {
    color: 'black', 
    fontSize: 50,
    transition: 'color 0.3s',
    '&:hover': { color: 'rgb(220, 125, 24)'}
  };

  const iconButtonStyle = {
    padding: '0px', 
    transition: 'backgroundColor 0.3s',
    '&:hover': { backgroundColor: 'transparent'}
  };

  return (
    <IconButton aria-label='Group Functions' className='app-icon' sx={iconButtonStyle} onClick={onClick}>
      <AppsIcon sx={appIconStyle} />
    </IconButton>
  )
}

