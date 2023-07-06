import React from 'react';
import axios from 'axios';
import Loading from '../pages/Loading';
import PersonIcon from '@mui/icons-material/Person';
import { useApiUrl } from '../hooks/useApiUrl';
import { FaSearch } from 'react-icons/fa';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

export const AuthInfo = () => {

  const apiUrl = useApiUrl();
  const navigate = useNavigate();
  
  //If profile not set up, users cannot connect with other users
  //Search Button would be disabled
  const [profile, setProfile] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [user] = useAuthState(auth);
  const userEmail = user.email;

  useEffect(() => {
    const fetchUserProfile = async() => {
      try {
        const response = await axios.get(`${apiUrl}/profile/${userEmail}`);
        if (response.data) {
          setProfile(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const profileIconStyle = {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Arial', 
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 2,
    marginBottom: 2
  };

  const queryResults = () => {
    localStorage.setItem('queryId', query);
    navigate('/searchresults');
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const goToEditProfile = () => {
    navigate('/editprofile');
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='info-authenticated'>
      {!profile ?
      <>
        <p> Finish setting up your profile before you can gain access to our features! </p>
        <Button variant='text' sx={profileIconStyle} startIcon={<PersonIcon />} onClick={goToEditProfile}>
          Set Up Profile  
        </Button>
      </>
      : null}
      <form className='search-form' onSubmit={queryResults}>
        <button className='search-button' disabled={!profile}>
          <FaSearch className='search-icon'/>
        </button>
        <input
          type='text'
          className='search-bar'
          value={query}
          onChange={handleInputChange}
          placeholder='Search'
        />
      </form>
    </div>
  )
}

export const UnauthInfo = () => {

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className='info-unauthenticated'>
        <h1> NUSMatch </h1>
        <p> Looking for project or studymates? Or just want to connect with new people? Look no further! </p>
        <button className='register-button' onClick={goToRegister}> Register </button>
    </div>
  )
}