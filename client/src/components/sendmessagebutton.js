import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

export const SendMessageButton = ({ onClick }) => {
    const individualButtonStyles = {
        color: 'black', 
        fontSize: 30,
        transition: 'color 0.3s',
        '&:hover': { color: 'rgb(220, 125, 24)'}
    };

    const iconButtonStyles = {
        padding: '0px', 
        transition: 'backgroundColor 0.3s',
        '&:hover': { backgroundColor: 'transparent'}
    };

    return (
        <IconButton aria-label='Send-Message' sx={iconButtonStyles} onClick={onClick}>
            <SendIcon sx={individualButtonStyles} />
        </IconButton>
    )
}
