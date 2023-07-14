import React, { useState } from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';
import '../styles/overlay.css';

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  const navigate = useNavigate();

  const register = async (e) => {  
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email + '@u.nus.edu', password);
        sendEmailVerification(auth.currentUser);
        signOut(auth);
        navigate('/');
        alert('Email verification sent! Verify your email before logging in.');
      } else {
        setPassword('');
        setConfirmPassword('');
        setRegisterStatus('Ensure that you keyed in the same password.');
      }
    } catch (err) {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setRegisterStatus('Account already exist.');
        } else if (err.code === 'auth/weak-password') {
          setPassword('');
          setConfirmPassword('');
          setRegisterStatus('Password should at least be 6 characters long');
        }
    }
  };

  return (
    <div className='register-page' style={{ backgroundImage: `url(${Wallpaper})`}}>
      <div className='overlay' />
      <form className='register-form' onSubmit={register}>
        {registerStatus && 
          (<p 
          className='register-status'> {registerStatus} 
          </p>)}
        <h1> Join the NUS Community Now! </h1>
        <input 
          value={email}
          placeholder='NUSNET ID'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          value={password}
          placeholder='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input 
          value={confirmPassword}
          placeholder = 'Confirm Password'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button> Register </button>
        <p> Already have an account? <Link to='/login'> Get Connected Now! </Link> </p>
      </form>
    </div>
  )
}

export default Register