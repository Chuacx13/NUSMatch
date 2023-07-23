import React, { useState } from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import '../styles/forgotpassword.css';
import '../styles/overlay.css';

function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [passwordResetStatus, setPasswordResetStatus] = useState('');

  const passwordReset = async (e) => { 
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email + '@u.nus.edu');
      setPasswordResetStatus('Email Sent!');
    } catch (err) {
        console.error(err);
        if (err.code === 'auth/user-not-found') {
          setEmail('');
          setPasswordResetStatus('Account does not exist');
        }
    }
  };

  return (
    <div className='forgot-password-page' data-testid='forgotpassword-page' style={{ backgroundImage: `url(${Wallpaper})`}}>
      <div className='overlay' />
      <form className='forgot-password-form' onSubmit={passwordReset}>
        {passwordResetStatus && 
          (<p className={passwordResetStatus === 'Email Sent!' ? 'password-reset-success' : 'password-reset-fail'}> {passwordResetStatus} </p>)}
        <h1> Send a password reset email! </h1>
        <input 
          value={email}
          placeholder='NUSNET ID'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={passwordReset}> Send Password Reset Email </button>
        <p> Ready to Login? <Link to='/login'> Get Connected Now! </Link> </p>
      </form>
    </div>
  )
}

export default ForgotPassword