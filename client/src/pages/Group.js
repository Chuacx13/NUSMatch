import React from 'react';
import axios from 'axios';
import Loading from '../pages/Loading';
import { useApiUrl } from '../hooks/useApiUrl';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/group.css';

function Group() {

  const apiUrl = useApiUrl();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userEmail = user.email;
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserGroups = async() => {
      try {
        const response = await axios.get(`${apiUrl}/group/${userEmail}`);
        setGroups(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }; 

    fetchUserGroups();
  }, []);

  const handleClickOnGroup = (e, index) => {
    e.stopPropagation(); 
    const groupDetail = groups[index];
    localStorage.setItem('resultId', groupDetail._id );
    navigate('/groupdetails');
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='group-page'>
      {groups.map((group, index) => 
        <div key={index} className='individual-results-container' onClick={(e) => handleClickOnGroup(e, index)}>
          <h1> {group.groupName} </h1>
          <h2> {group.groupStatus} </h2>
          <h2> Description: {group.groupDescription.length > 20 ? group.groupDescription.slice(0, 20) + '...' : group.groupDescription} </h2>
          <p className='modules-description'> Common Modules: {group.modules.join('. ')} </p>
        </div>
      )}
    </div>
  )
}

export default Group