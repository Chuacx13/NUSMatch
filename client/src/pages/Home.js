import React from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import { Button } from '@mui/material';
import { AuthInfo } from '../components/authinfo';
import { UnauthInfo } from '../components/unauthinfo';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/home.css';
import '../styles/overlay.css';

function Home() {

  const [user] = useAuthState(auth);
  
  return (
    <div className='home' style={{ backgroundImage: `url(${Wallpaper})`}}>
      <div className='overlay' />
      {!user ? 
        <UnauthInfo />
      : <AuthInfo />
      }
    </div>
  );
}

export default Home;