import React from 'react';
import axios from 'axios';
import DefaultProfileImage from '../assets/defaultprofileimg.jpg';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/profile.css';

function Profile() {

  const [profile, setProfile] = useState({});
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

  const goToEditProfile = () => {
    navigate('/editprofile');
  };

  return (
    <div className='profilePage'>
      {!profile ? navigate('/editprofile') :
      <>
        <button className='editProfileButton' onClick={goToEditProfile}> Edit </button>
        <img src={DefaultProfileImage} alt='defaultProfileImage' className='profileImage'/>
        <div className='introContainer'>
          <h1 className='profileIntro'>{profile.name}</h1>
          <p className='profileIntro profileIntro_Less'>{profile.email}</p>
          <p className='profileIntro profileIntro_Less'
            style={profile.status==='Active' ? {color:'green'} : {color:'red'}}>
            {profile.status==='Active' ? 'Let\'s Connect!' : 'Chilling Right Now'}
          </p>
        </div>
        
        <h2 className='profileDetailsHeader'>Current Year of Study</h2>
        <p className='profileDetails'>{profile.year}</p>
        
        
        <h2 className='profileDetailsHeader'>Academic Goals</h2>
        <p className='profileDetails'>{profile.academicGoals}</p>

        <h2 className='profileDetailsHeader'>Degree</h2>
        {profile.degree?.map((degree, index) => (
          <p key={index} className='profileDetails'> {degree} </p>
        ))}
        
        <h2 className='profileDetailsHeader'>Current Modules</h2>
        {profile.currentModules?.map((currentModules, index) => (
          <p key={index} className='profileDetails'> {currentModules} </p>
        ))}
      
        <h2 className='profileDetailsHeader'>Personal Interest</h2>
        {profile.personalInterest?.map((personalInterest, index) => (
          <p key={index} className='profileDetails'> {personalInterest} </p>
        ))}
      </>}
    </div>
  )
}

export default Profile;