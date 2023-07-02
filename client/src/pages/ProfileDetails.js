import React from 'react';
import axios from 'axios';
import DefaultProfileImage from '../assets/defaultprofileimg.jpg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/profile.css';

function ProfileDetails() {

  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async() => {
      try {
        const userId = localStorage.getItem('resultId');
        const response = await axios.get(`http://localhost:3001/profile/other/${userId}`);
        setProfile(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <div className='profile-page'>
      {!profile ? navigate('/editprofile') :
      <>
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

export default ProfileDetails;