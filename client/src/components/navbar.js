import React from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import { useApiUrl } from '../hooks/useApiUrl';
import { FaSearch } from 'react-icons/fa';
import { AccountIcon } from './accounticon';
import { GroupChatsIcon } from './groupchatsicon';
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
  const isNoBackground = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgotpassword';
  const isSearching = location.pathname === '/searchresults';
  const isGroupChatPage = location.pathname === '/groupchats';

  const [query, setQuery] = useState(localStorage.getItem('queryId'));
  useEffect(() => {

    const queryId = localStorage.getItem('queryId');
    setQuery(queryId);

  }, [localStorage.getItem('queryId')]);

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
        <form className='search-form' onSubmit={queryResults}>
          <button className='search-button'>
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
            {!isGroupChatPage && <GroupChatsIcon />}
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