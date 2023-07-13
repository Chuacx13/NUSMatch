import './App.css';
import Navbar from './components/navbar';
import ScrollToTop from './components/scrolltotop';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Group from './pages/Group';
import CreateGroup from './pages/CreateGroup';
import GroupDetails from './pages/GroupDetails';
import EditGroup from './pages/EditGroup';
import GroupRequests from './pages/GroupRequests';
import Profile from './pages/Profile';
import ProfileDetails from './pages/ProfileDetails';
import EditProfile from './pages/EditProfile';
import SearchResults from './pages/SearchResults';
import GroupChats from './pages/GroupChats';
import IndivGroupChat from './pages/IndivGroupChat';
import Schedule from './pages/Schedule';
import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import EditProfileRoute from './utils/EditProfileRoute';
import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [, loading] = useAuthState(auth);

  return (
    <> 
      {loading ? (
        <Loading/>
      ) : 
      <Router>
        <Navbar />
        <ScrollToTop /> 
        <Routes> 
          <Route path='/' exact element={<Home/>}/>
          <Route element={<PublicRoutes />}>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/register' exact element={<Register/>}/>
            <Route path='/forgotpassword' exact element={<ForgotPassword/>}/>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/profiledetails' element={<ProfileDetails/>}/>
            <Route path='/group' element={<Group/>}/>
            <Route path='/creategroup' element={<CreateGroup/>}/>
            <Route path='/groupdetails' element={<GroupDetails/>}/>
            <Route path='/editgroup' element={<EditGroup/>}/>
            <Route path='/requests' element={<GroupRequests/>}/>
            <Route path='/searchresults' element={<SearchResults/>}/>
            <Route path='/groupchats' element={<GroupChats/>}/>
            <Route path='/individualgroupchat' element={<IndivGroupChat/>}/>
            <Route path='/schedule' element={<Schedule/>}/>
          </Route>
          <Route element={<EditProfileRoute />}>
            <Route path='/editprofile' element={<EditProfile/>}/>
          </Route>
        </Routes>
      </Router>
      }
    </>
  );
};

export default App;
