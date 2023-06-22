import React from 'react';
import { Link } from 'react-router-dom';

export const UnauthInfo = () => {
  return (
    <div className='info-unauthenticated'>
        <h1> NUSMatch </h1>
        <p> Looking for project or studymates? Or just want to connect with new people? Look no further! </p>
        <Link to='/register'>
        <button className='registerButton'> Register </button>
        </Link> 
    </div>
  )
}
