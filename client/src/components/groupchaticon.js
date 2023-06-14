import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export const GroupChatIcon = () => {

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
    <Link to='/chat'>
        <IconButton arial-label='Chat' sx={iconButtonStyles}>
          <ChatIcon style={individualButtonStyles}/>
          <div className='tooltip'> Group Chats </div>
        </IconButton>
    </Link>
  )
}
