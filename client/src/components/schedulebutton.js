import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ScheduleButton = () => {

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

  const goToSchedule = () => {
    navigate('/schedule');
  };

  return (
    <Button variant='text' sx={buttonStyles} startIcon={<CalendarMonthIcon style={chatButtonStyles}/>} onClick={goToSchedule}>
      Group Schedule
    </Button>
  )
}
