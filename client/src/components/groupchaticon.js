import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const GroupChatIcon = () => {

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

  const goToChat = () => {
    navigate('/chat');
  };

  return (
    <div className='link'>
        <IconButton arial-label='Chat' sx={iconButtonStyles} onClick={goToChat}>
          <ChatIcon style={individualButtonStyles}/>
          <div className='tooltip'> Group Chats </div>
        </IconButton>
    </div>
  )
}
