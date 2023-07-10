import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const GroupChatsIcon = () => {

  const navigate = useNavigate();

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

  const goToChat = () => {
    navigate('/groupchats');
  };

  return (
    <IconButton className='link' arial-label='Chat' sx={iconButtonStyles} onClick={goToChat}>
      <ChatIcon sx={individualButtonStyles}/>
      <div className='tooltip'> Group Chats </div>
    </IconButton>
  )
}
