import React, { useState, useEffect } from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import { AuthInfo, UnauthInfo } from '../components/homeinfo';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/home.css';
import '../styles/overlay.css';

function Home() {

  const [user] = useAuthState(auth);

  useEffect(() => {
    const clearLocalStorage = async() => {
      try {
          localStorage.removeItem('queryId');
          localStorage.removeItem('groupId');
          localStorage.removeItem('profileId');
          localStorage.removeItem('groupChatId');
      } catch (err) {
        console.error(err);
      }
    };

    clearLocalStorage();
  }, []);

  return (
      <div className='home' style={{ backgroundImage: `url(${Wallpaper})`}}>
        <div className='overlay' />
        {user ? 
          <AuthInfo />
        : <UnauthInfo />
        }
      </div>
  );
}

export default Home;