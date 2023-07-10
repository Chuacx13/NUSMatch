import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const GroupChatButton = () => {

  const navigate = useNavigate();

  const chatButtonStyles = {
    fontSize: 30
  };

  const buttonStyles = {
    color: 'black',
    padding: '0px',
    fontSize: 30,
    transition: 'color 0.3s',
    '&:hover': { 
      color: 'rgb(220, 125, 24)',
      backgroundColor: 'transparent' }
  };

  const goToGroupChat = () => {
    navigate('/chathistory');
  };

  return (
    <Button variant='text' sx={buttonStyles} startIcon={<ChatIcon style={chatButtonStyles}/>} onClick={goToGroupChat}>
      Group Chat
    </Button>
  )
}
