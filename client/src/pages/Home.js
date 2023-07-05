import React, { useState, useEffect } from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import Loading from './Loading';
import { AuthInfo, UnauthInfo } from '../components/homeinfo';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/home.css';
import '../styles/overlay.css';

function Home() {

  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const clearLocalStorage = async() => {
      try {
        if (!loading) {
        localStorage.removeItem('queryId');
        localStorage.removeItem('resultId');
        setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    clearLocalStorage();
  }, [loading]);

  return (
    <>
      {isLoading ? (<Loading />) :
      <div className='home' style={{ backgroundImage: `url(${Wallpaper})`}}>
        <div className='overlay' />
        {!user ? 
          <UnauthInfo />
        : <AuthInfo />
        }
      </div>
      }
    </>
  );
}

export default Home;