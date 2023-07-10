import React from 'react';
import axios from 'axios';
import Loading from '../pages/Loading';
import { useApiUrl } from '../hooks/useApiUrl';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/grouprequests.css';

function GroupRequests() {

  const apiUrl = useApiUrl();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]); 
  const [group, setGroup] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);
  const userEmail = user.email;

  useEffect(() => {
    const groupId = localStorage.getItem('groupId');
    const fetchRequests = async() => {
      try {
        const profiles = await axios.get(`${apiUrl}/group/requests/${groupId}`);
        const groupData = await axios.get(`${apiUrl}/group/other/${groupId}`);
        setRequests(profiles.data); 
        setGroup(groupData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRequests();
  }, [requests]);

  const handleClickOnProfile = (e, index) => {
    e.stopPropagation(); 
    const profileDetail = requests[index];
    localStorage.setItem('profileId', profileDetail._id );
    navigate('/profileDetails');
  };

  const isLeader = () => {
    return userEmail === group.leader;
  }

  const accept = async (e, index) => {
    const email = requests[index].email;
    const groupId = localStorage.getItem('groupId');
    try {
      const response = await axios.put(`${apiUrl}/group/accept/${groupId}`, {email});
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (e, index) => {
    const email = requests[index].email;
    const groupId = localStorage.getItem('groupId');
    try {
      const response = await axios.put(`${apiUrl}/group/reject/${groupId}`, {email});
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='group-requests-page'>
        {requests.map((request, index) => 
        <div key={index} className='individual-request-container'>
          <div className='profile-container' onClick={(e) => handleClickOnProfile(e, index)}>
            <h1> {request.name} wants to join! </h1>
          </div>
          <div className='request-buttons'>
            <button className='accept-button' onClick={(e) => accept(e, index)} disabled={!isLeader()}> &#10004; Accept </button>
            <button className='reject-button' onClick={(e) => reject(e, index)} disabled={!isLeader()}> &#10008; Reject </button>
          </div>
        </div>
        )}
    </div>
  )
}

export default GroupRequests