import React from 'react';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';

export const AuthInfo = () => {

  const navigate = useNavigate();
  
  //If profile not set up, users cannot connect with other users
  //Search Button would be disabled
  const [profile, setProfile] = useState(false);
  const [query, setQuery] = useState('');

  const [user] = useAuthState(auth);
  const userEmail = user.email;

  useEffect(() => {
    const fetchUserProfile = async() => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${userEmail}`);
        if (response.data) {
          setProfile(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchUserProfile();
  }, []);

  const profileIconStyle = {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Arial', 
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 2,
    marginBottom: 2
  };

  const searchIconStyle = {
    color: 'black',
    fontSize: 46,
    backgroundColor: 'gray',
    padding: 3,
    paddingLeft: 8,
    margin: -12,
    borderRadius: 10,
    opacity: profile ? 1 : 0.3
  }

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

  return (
    <div className='info-authenticated'>
      {!profile ?
      <>
        <p> Finish setting up your profile before you connect with others </p>
        <Button variant='text' sx={profileIconStyle} startIcon={<PersonIcon />} onClick={goToEditProfile}>
          Set Up Profile  
        </Button>
      </>
      : null}
      <form className='search-form' onSubmit={queryResults} disabled={!profile}>
        <input
          type='text'
          className='searchbar'
          value={query}
          onChange={handleInputChange}
          placeholder='Search'
        />
        <IconButton arial-label='SearchButton' disabled={!profile}> 
          <SearchIcon style={searchIconStyle} />
        </IconButton>
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