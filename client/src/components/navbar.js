import React from 'react';
import axios from 'axios';
import Loading from '../pages/Loading';
import Wallpaper from '../assets/wallpaper.jpg';
import { useApiUrl } from '../hooks/useApiUrl';
import { FaSearch } from 'react-icons/fa';
import { CreateGroupIcon } from './creategroupicon';
import { AccountIcon } from './accounticon';
import { GroupChatIcon } from './groupchaticon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    const queryId = localStorage.getItem('queryId');
    setQuery(queryId);

    const fetchUserProfile = async() => {
      try {
        const userEmail = user?.email;
        if (userEmail) {
          const response = await axios.get(`${apiUrl}/profile/${userEmail}`);
          if (response.data) {
            setProfile(true);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

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
  
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='navbar' style={isNoBackground ? null : { backgroundImage: `url(${Wallpaper})`}}>
      {!isNoBackground && <div className='overlay' style={{zIndex: -1}}/>}
      <div className='left-side'></div>
      <div className='middle'>
        {isSearching && 
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