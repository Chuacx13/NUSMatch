import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';

export const AuthenticatedInfo = () => {

  const [query, setQuery] = useState('');
  //If profile not set up, users cannot connect with other users
  //Search Button would be disabled
  const [profileSetUp, setProfileSetUp] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };


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
    opacity: profileSetUp ? 1 : 0.3
  }

  return (
    <div className='info-authenticated'>
      <p> Finish setting up your profile before you connect with others </p>
      <Link to ='/profile'>
        <Button variant='text' sx={profileIconStyle} startIcon={<PersonIcon />}>
           Set Up Profile  
        </Button>
      </Link>
      <form>
        <input
          type='text'
          className='searchbar'
          value={query}
          onChange={handleInputChange}
          placeholder='Search'
        />
        <Link to='/searchresults' onClick={profileSetUp ? null : (e) => e.preventDefault()}>
          <IconButton arial-label='SearchButton' disabled={!profileSetUp}> 
            <SearchIcon style={searchIconStyle} />
          </IconButton>
        </Link>
      </form>
    </div>
  )
}
