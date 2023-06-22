import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Group from './pages/Group';
import CreateGroup from './pages/CreateGroup';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import SearchResults from './pages/SearchResults';
import Chat from './pages/Chat';
import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { useState, useEffect } from 'react';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
  }, []);

  const [user] = useAuthState(auth);
  
  return (
    <> 
      {isLoading ? (
        <div id='loading-overlay'>
          <div id='spinner'></div>
        </div>
      ) : 
      <Router>
        <Navbar />
        <Routes> 
          <Route path='/' exact element={<Home/>}/>
          <Route element={<PublicRoutes />}>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/register' exact element={<Register/>}/>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/editprofile' element={<EditProfile/>}/>
            <Route path='/group' element={<Group/>}/>
            <Route path='/creategroup' element={<CreateGroup/>}/>
            <Route path='/searchresults' element={<SearchResults/>}/>
            <Route path='/chat' element={<Chat/>}/>
          </Route>
        </Routes>
      </Router>
      }
    </>
  );
};

export default App;
