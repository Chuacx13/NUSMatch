import React from 'react';
import axios from 'axios';
import Loading from '../pages/Loading';
import { useApiUrl } from '../hooks/useApiUrl';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/editform.css';

function EditProfile() {

  const apiUrl = useApiUrl();
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async() => {
      try {
        const response = await axios.get(`${apiUrl}/profile/${userEmail}`);
        if (response.data) {
          setProfile(response.data);
          setProfileCreated(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
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
      if (!profileCreated) {
        await axios.post(`${apiUrl}/profile`, { ...profile });
        navigate('/profile');
      } else {
        await axios.put(`${apiUrl}/profile/${userEmail}`, { ...profile });
        navigate('/profile');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const goToPreviousPage = () => {
    if (!profileCreated) {
      navigate('/');
    } else {
      navigate('/profile')
    }
  };

  if (isLoading) {
    return <Loading />
  }
  
  return (
    <div className='edit-form-page'>
      <form className='edit-form' onSubmit={saveProfile}>
        <div className='edit-form-header-container'> 
          <h1 className='edit-form-header'> Edit Profile </h1>
          <button type='button' className='edit-form-back-button' onClick={goToPreviousPage}> Back </button> 
        </div>
        <label className='edit-form-label' htmlFor='name'>Name</label>
        <input className='edit-form-inputs' type='text' id='name' name='name' value={profile.name} onChange={handleChange} required />

        <label className='edit-form-label' htmlFor='year'>Year</label>
        <input className='edit-form-inputs' type='number' id='year' name='year' value={profile.year} onChange={handleChange}  min={1} required/>

        <label className='edit-form-label' htmlFor='academicGoals'>Academic Goals</label>
        <select className='edit-form-inputs' id='academicGoals' name='academicGoals' value={profile.academicGoals} onChange={handleChange} required>
          <option value=''>Select a goal</option>
          <option value='Chill'>Chill</option>
          <option value="Dean's List">Dean's List</option>
          <option value='First Class'>First Class</option>
          <option value='Second Class Upper'>Second Class Upper</option>
          <option value='Second Class Lower'>Second Class Lower</option>
          <option value='Third Class'>Third Class</option>
        </select>

        <label className='edit-form-label' htmlFor='status'>Status</label>
        <select className='edit-form-inputs' id='status' name='status' value={profile.status} onChange={handleChange} required>
          <option value=''>Select a status</option>
          <option value='Active'> Active </option>
          <option value='Snooze'> Snooze </option>
        </select>
        
        <label className='edit-form-label' htmlFor='degree'>Degree</label>
        {profile.degree.map((degree, index) => (
          <div key={index}>
            <input
              type='text'
              name='degree'
              className='edit-form-inputs'
              value={degree}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modify-list-button' type='button' name='degree' onClick={(e) => handleDelete(e, index)}> 
              Delete Degree
            </button>
          </div>
        ))}
        <button className='modify-list-button' type="button" name='degree' onClick={handleAdd}>
          Add Degree
        </button>

        <label className='edit-form-label' htmlFor='currentModules'>Current Modules</label>
        {profile.currentModules.map((currentModule, index) => (
          <div key={index}>
            <input
              type='text'
              name='currentModules'
              className='edit-form-inputs'
              value={currentModule}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modify-list-button' type='button' name='currentModules' onClick={(e) => handleDelete(e, index)}> 
                Delete Module
            </button>
          </div>
        ))}
        <button className='modify-list-button' type="button" name='currentModules' onClick={handleAdd}>
          Add Module
        </button>

        <label className='edit-form-label' htmlFor='personalInterest'>Personal Interest</label>
        {profile.personalInterest.map((personalInterest, index) => (
          <div key={index}>
            <input
              key={index}
              type='text'
              name='personalInterest'
              className='edit-form-inputs'
              value={personalInterest}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modify-list-button' type='button' name='personalInterest' onClick={(e) => handleDelete(e, index)}> 
                  Delete Interest
            </button>
          </div>
        ))}
        <button className='modify-list-button' type="button" name='personalInterest' onClick={handleAdd}>
          Add Interest
        </button>
        <button className='save-button'>Save</button>
      </form>
    </div>
  )
}

export default EditProfile;