import React from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/editprofile.css';

function EditProfile() {

  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userEmail = user.email;
  const [profileCreated, setProfileCreated] = useState(false);
  const [profile, setProfile] = useState({
    email: userEmail,
    name: '',
    year: 0,
    degree: [],
    currentModules: [],
    academicGoals: '',
    status: '',
    personalInterest: []
  });

  useEffect(() => {
    const fetchUserProfile = async() => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${userEmail}`);
        if (response.data) {
          setProfile(response.data);
          setProfileCreated(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAdd = (e) => {
    const name = e.target.name;
    const updatedValue = [...profile[name], ""];
    setProfile({ ...profile, [name]: updatedValue });
  };

  const handleDelete = (e, index) => {
    const name = e.target.name;
    const updatedValue = [...profile[name]];
    updatedValue.splice(index, 1);
    setProfile({ ...profile, [name]: updatedValue });
  };

  const handleAddAndChange = (e, index) => {
    const { name, value } = e.target;
    const currentValue = [...profile[name]];
    currentValue[index] = value;
    setProfile({ ...profile, [name]: currentValue });
  }

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      let updatedModules = [ ...profile.currentModules ];
      updatedModules = updatedModules.map((module) => module.toUpperCase());
      if (!profileCreated) {
        await axios.post('http://localhost:3001/profile/edit', { ...profile, currentModules: updatedModules });
        navigate('/profile');
      } else {
        await axios.put(`http://localhost:3001/profile/edit/${userEmail}`, { ...profile, currentModules: updatedModules });
        navigate('/profile');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className='editProfilePage'>
      <form className='editProfileForm' onSubmit={saveProfile}>
        <div className='profileHeaderContainer'> 
          <h1 className='profileFormHeader'> Edit Profile </h1>
          <Link to='/profile'>
            <button type='button' className='profileBackButton'> Back </button> 
          </Link>
        </div>
        <label className='profileFormLabel' htmlFor='name'>Name</label>
        <input className='editProfileInputs' type='text' id='name' name='name' value={profile.name} onChange={handleChange} required />

        <label className='profileFormLabel' htmlFor='year'>Year</label>
        <input className='editProfileInputs' type='number' id='year' name='year' value={profile.year} onChange={handleChange}  min={1} required/>

        <label className='profileFormLabel' htmlFor='academicGoals'>Academic Goals</label>
        <select className='editProfileInputs' id='academicGoals' name='academicGoals' value={profile.academicGoals} onChange={handleChange} required>
          <option value=''>Select a goal</option>
          <option value='Chill'>Chill</option>
          <option value="Dean's List">Dean's List</option>
          <option value='First Class'>First Class</option>
          <option value='Second Class Upper'>Second Class Upper</option>
          <option value='Second Class Lower'>Second Class Lower</option>
          <option value='Third Class'>Third Class</option>
        </select>

        <label className='profileFormLabel' htmlFor='status'>Status</label>
        <select className='editProfileInputs' id='status' name='status' value={profile.status} onChange={handleChange} required>
          <option value=''>Select a status</option>
          <option value='Active'> Active </option>
          <option value='Snooze'> Snooze </option>
        </select>
        
        <label className='profileFormLabel' htmlFor='degree'>Degree</label>
        {profile.degree.map((degree, index) => (
          <div key={index}>
            <input
              type='text'
              name='degree'
              className='editProfileInputs'
              value={degree}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modifyListButton' type='button' name='degree' onClick={(e) => handleDelete(e, index)}> 
              Delete Degree
            </button>
          </div>
        ))}
        <button className='modifyListButton' type="button" name='degree' onClick={handleAdd}>
          Add Degree
        </button>

        <label className='profileFormLabel' htmlFor='currentModules'>Current Modules</label>
        {profile.currentModules.map((currentModule, index) => (
          <div key={index}>
            <input
              type='text'
              name='currentModules'
              className='editProfileInputs'
              value={currentModule}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modifyListButton' type='button' name='currentModules' onClick={(e) => handleDelete(e, index)}> 
                Delete Module
            </button>
          </div>
        ))}
        <button className='modifyListButton' type="button" name='currentModules' onClick={handleAdd}>
          Add Module
        </button>

        <label className='profileFormLabel' htmlFor='personalInterest'>Personal Interest</label>
        {profile.personalInterest.map((personalInterest, index) => (
          <div key={index}>
            <input
              key={index}
              type='text'
              name='personalInterest'
              className='editProfileInputs'
              value={personalInterest}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modifyListButton' type='button' name='personalInterest' onClick={(e) => handleDelete(e, index)}> 
                  Delete Interest
            </button>
          </div>
        ))}
        <button className='modifyListButton' type="button" name='personalInterest' onClick={handleAdd}>
          Add Interest
        </button>
        <button className='saveButton'>Save</button>
      </form>
    </div>
  )
}

export default EditProfile;