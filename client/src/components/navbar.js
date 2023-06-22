import React from 'react';
import Wallpaper from '../assets/wallpaper.jpg';
import { CreateGroupIcon } from './creategroupicon';
import { AccountIcon } from './accounticon';
import { GroupChatIcon } from './groupchaticon';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/navbar.css';
import '../styles/overlay.css';
/*<Link to='/creategroup'> 
  <Button variant='outlined' 
    startIcon={<GroupsIcon style={{ fontSize: 30 }}/>} 
    sx={{ 
      color: 'white', 
      borderColor: 'white', 
      fontSize: 16,  
      '&:hover': { borderColor: 'white', backgroundColor: 'white', color: 'black'}}}>
    CREATE GROUP
  </Button>
</Link>*/

//TO DO LIST
//CSS for Home Page
//Profile Page
//Group Page

function Navbar() {

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [user] = useAuthState(auth);
  const isNoBackground = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  return (

    <div className='navbar' style={isNoBackground ? null : { backgroundImage: `url(${Wallpaper})`}}>
      {!isNoBackground && <div className='overlay' style={{zIndex: -1}}/>}
      <div className='leftSide'></div>
      <div className='rightSide'>
        {!isHomePage && (<Link to='/'> Home </Link>)}
        {user ? 
          <>
            <CreateGroupIcon />
            <GroupChatIcon />
            <AccountIcon />
          </>
          : isHomePage ? 
          (<Link to='/login'>
            <button className='loginButton'> Login </button>
          </Link>) 
            : null }
      </div>
    </div>
  );
}

export default Navbar;