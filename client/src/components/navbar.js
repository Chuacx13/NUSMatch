import React from 'react';
import axios from 'axios';
import Wallpaper from '../assets/wallpaper.jpg';
import SearchIcon from '@mui/icons-material/Search';
import { useApiUrl } from '../hooks/useApiUrl';
import { CreateGroupIcon } from './creategroupicon';
import { AccountIcon } from './accounticon';
import { GroupChatIcon } from './groupchaticon';
import { IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import '../styles/overlay.css';

function Navbar() {

  const apiUrl = useApiUrl();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  //Check location to determine what icons to display
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isNoBackground = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';
  const isSearching = location.pathname === '/searchresults';

  const [query, setQuery] = useState('');
  const [profile, setProfile] = useState(false);
  

  useEffect(() => {

    const queryId = localStorage.getItem('queryId');
    setQuery(queryId);

    const fetchUserProfile = async() => {
      try {
        const userEmail = user?.email;
        const response = await axios.get(`${apiUrl}/profile/${userEmail}`);
        if (response.data) {
          setProfile(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchUserProfile();
  }, [user]);

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

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  
  const queryResults = () => {
    localStorage.setItem('queryId', query);
    navigate('/searchresults');
  };

  const goToLogin = () => {
    navigate('/login');
  };
  
  return (

    <div className='navbar' style={isNoBackground ? null : { backgroundImage: `url(${Wallpaper})`}}>
      {!isNoBackground && <div className='overlay' style={{zIndex: -1}}/>}
      <div className='left-side'></div>
      <div className='middle'>
        {isSearching && 
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
        </form>}
      </div>
      <div className='right-side'>
        {!isHomePage && (<Link to='/' className='link'> Home </Link>)}
        {user ? 
          <>
            <CreateGroupIcon />
            <GroupChatIcon />
            <AccountIcon />
          </>
          : isHomePage ? 
          (<button className='login-button' onClick={goToLogin}> Login </button>) 
            : null }
      </div>
    </div>
  );
}

export default Navbar;