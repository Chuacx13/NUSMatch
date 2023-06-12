import React from 'react';
import Logout from './logout';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/navbar.css';

function Navbar() {

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <div className='navbar'>
        <div className='leftSide'></div>
        <div className='rightSide'>
          {!isHomePage && (<Link to='/'> Home </Link>)}
          {isHomePage && user ? <Logout /> : isHomePage ? (<Link to='/login'>
            <button className='loginButton'> Login </button>
          </Link>) : null }
        </div>
    </div>
  );
}

export default Navbar;