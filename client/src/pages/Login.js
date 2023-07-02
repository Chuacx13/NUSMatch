import React from 'react';
import axios from 'axios';
import Wallpaper from '../assets/wallpaper.jpg';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import '../styles/overlay.css';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const noRefresh = async (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
  }

  const login = async () => {
    try {
      const userEmail = email + '@u.nus.edu';
      const response = await axios.get(`http://localhost:3001/auth/${userEmail}`);
      if (response.data) {
        console.log(response.data);
        console.log('help');
        await signInWithEmailAndPassword(auth, email + '@u.nus.edu', password);
        navigate('/');
      } else {
        setLoginStatus('Email not verified. Verify before logging in');
      }
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        setLoginStatus('NUSNET ID and Password does not match.');
      } else if (err.code === 'auth/user-not-found' || err.response.status === 404) {
        setLoginStatus('User does not exist. Sign up first!');
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className='login-page' style={{ backgroundImage: `url(${Wallpaper})`}}>
      <div className='overlay' />
      <form className='login-form' onSubmit={noRefresh}>
        {loginStatus && (<p className='login-status'> {loginStatus} </p>)}
        <h1> Start Connecting! </h1>
        <input 
          value={email}
          placeholder="NUSNET ID" 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={login}> Log In </button>
        <p> New to NUSMatch? <Link to='/register'> Join Us! </Link> </p>
      </form>
    </div>
  );
}

export default Login