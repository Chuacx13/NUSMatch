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
    try {
      e.preventDefault();
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email + '@u.nus.edu', password);
        sendEmailVerification(auth.currentUser);
        signOut(auth);
        navigate('/');
      } else {
        setRegisterStatus('Ensure that you keyed in the same password.');
      }
    } catch (err) {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          setRegisterStatus('Account already exist.');
        }
    }
  };

  return (
    <div className='register-page' style={{ backgroundImage: `url(${Wallpaper})`}}>
      <div className='overlay' />
      <form className='register-form' onSubmit={register}>
        {registerStatus && 
          (<p 
          className={registerStatus==='Account successfully created. Verify your email before logging in.' ? 'success' : 'failure'}> {registerStatus} 
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