import React from 'react';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';

export const AuthInfo = () => {

  const [query, setQuery] = useState('');
  //If profile not set up, users cannot connect with other users
  //Search Button would be disabled
  const [profile, setProfile] = useState(false);
  const [user] = useAuthState(auth);
  const userEmail = user.email;

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

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
    borderRadius: 4,
    opacity: profile ? 1 : 0.3
  }

  return (
    <div className='info-authenticated'>
      {!profile ?
      <>
        <p> Finish setting up your profile before you connect with others </p>
        <Link to ='/editprofile'>
          <Button variant='text' sx={profileIconStyle} startIcon={<PersonIcon />}>
            Set Up Profile  
          </Button>
        </Link>
      </>
      : null}
      <form className='searchForm'>
        <input
          type='text'
          className='searchbar'
          value={query}
          onChange={handleInputChange}
          placeholder='Search'
        />
        <Link to='/searchresults' onClick={profile ? null : (e) => e.preventDefault()}>
          <IconButton arial-label='SearchButton' disabled={!profile}> 
            <SearchIcon style={searchIconStyle} />
          </IconButton>
        </Link>
      </form>
    </div>
  )
}
