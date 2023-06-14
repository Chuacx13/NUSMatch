import React from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import { Button } from '@mui/material';
import { AuthenticatedInfo } from '../components/authinfo';
import { UnauthenticatedInfo } from '../components/unauthinfo';
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
        <UnauthenticatedInfo />
      : <AuthenticatedInfo />
      }
    </div>
  );
}

export default Home;