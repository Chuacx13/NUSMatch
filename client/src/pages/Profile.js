import React from 'react';
import axios from 'axios';
import DefaultProfileImage from '../assets/defaultprofileimg.jpg';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/profile.css';

function Profile() {

  const [profile, setProfile] = useState([]);
  const [user] = useAuthState(auth);
  const userEmail = user.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async() => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${userEmail}`);
        setProfile(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUserProfile();
  }, []);

  if (!profile) {
    setProfile({
      email: userEmail,
      name: '',
      year: 0,
      degree: [],
      currentModules: [],
      academicGoals: '',
      status: '',
      personalInterest: []
    });
  }

  return (
    <div className='profilePage'>
      <Link to='/editprofile'>
        <button className='editProfileButton'> Edit </button>
      </Link>
      {!profile ? navigate('/editprofile') :
      <>
        <img src={DefaultProfileImage} alt='defaultProfileImage' className='profileImage'/>
        <div className='introContainer'>
          <h1 className='profileIntro'>{profile.name}</h1>
          <p className='profileIntro profileIntro_Less'>{profile.email}</p>
          <p className='profileIntro profileIntro_Less'
            style={profile.status==='Active' ? {color:'green'} : {color:'red'}}>
            {profile.status==='Active' ? 'Let\'s Connect!' : 'Chilling Right Now'}
          </p>
        </div>
        
        <h3 className='profileDetailsHeader'>Current Year of Study</h3>
        <p className='profileDetails'>{profile.year}</p>
        
        <h3 className='profileDetailsHeader'>Degree</h3>
        {profile.degree?.map((degree) => (
          <p className='profileDetails'> {degree} </p>
        ))}
        
        <h3 className='profileDetailsHeader'>Current Modules</h3>
        {profile.currentModules?.map((currentModules) => (
          <p className='profileDetails'> {currentModules} </p>
        ))}
        
        <h3 className='profileDetailsHeader'>Academic Goals</h3>
        <p className='profileDetails'>{profile.academicGoals}</p>
      
        <h3 className='profileDetailsHeader'>Personal Interest</h3>
        {profile.personalInterest?.map((personalInterest) => (
          <p className='profileDetails'> {personalInterest} </p>
        ))}
      </>}
    </div>
  )
}

export default Profile;