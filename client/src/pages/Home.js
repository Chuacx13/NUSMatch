import React from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/home.css';
import '../styles/overlay.css';

function Home() {

  const [user] = useAuthState(auth);
  
  return (
    <div className='home' style={{ backgroundImage: `url(${Wallpaper})`}}>
      <div className='overlay' />
      <div className='info'>
        <h1> NUSMatch </h1>
        <p> Looking for project or studymates? Or just want to connect with new people? Look no further! </p>
        <Link to='/register'>
          <button className='registerButton'> Register </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;