import React from 'react';
import axios from 'axios';
import Loading from './Loading';
import DefaultProfileImage from '../assets/defaultprofileimg.jpg';
import { useApiUrl } from '../hooks/useApiUrl';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/profile.css';

function Profile() {

  const apiUrl = useApiUrl();
  const [user] = useAuthState(auth);
  const userEmail = user.email;
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async() => {
      try {
        const response = await axios.get(`${apiUrl}/profile/${userEmail}`);
        setProfile(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const goToEditProfile = () => {
    navigate('/editprofile');
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='profile-page'>
      {!profile ? navigate('/editprofile') :
      <>
        <button className='edit-profile-button' onClick={goToEditProfile}> Edit </button>
        <img src={DefaultProfileImage} alt='defaultProfileImage' className='profile-image'/>
        <div className='intro-container'>
          <h1 className='profile-intro'>{profile.name}</h1>
          <p className='profile-intro profile-intro-small'>{profile.email}</p>
          <p className='profile-intro profile-intro-small'
            style={profile.status==='Active' ? {color:'green'} : {color:'red'}}>
            {profile.status==='Active' ? 'Let\'s Connect!' : 'Chilling Right Now'}
          </p>
        </div>
        
        <h2 className='profile-details-header'>Current Year of Study</h2>
        <p className='profile-details'>{profile.year}</p>
        
        
        <h2 className='profile-details-header'>Academic Goals</h2>
        <p className='profile-details'>{profile.academicGoals}</p>

        <h2 className='profile-details-header'>Degree</h2>
        {profile.degree?.map((degree, index) => (
          <p key={index} className='profile-details'> {degree} </p>
        ))}
        
        <h2 className='profile-details-header'>Current Modules</h2>
        {profile.currentModules?.map((currentModules, index) => (
          <p key={index} className='profile-details'> {currentModules} </p>
        ))}
      
        <h2 className='profile-details-header'>Personal Interest</h2>
        {profile.personalInterest?.map((personalInterest, index) => (
          <p key={index} className='profile-details'> {personalInterest} </p>
        ))}
      </>}
    </div>
  )
}

export default Profile;