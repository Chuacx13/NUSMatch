import React from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/searchresults.css';
import '../styles/group.css';

function SearchResults() {

  const navigate = useNavigate();
  const [results, setResults] = useState([]); 
  //Default state ('Profile) is where user will see profiles related to their search query
  //By toggling the button to set default state to 'Group' will allow users to see groups related to their search query
  const [defaultState, setDefaultState] = useState('profile');

  const [user] = useAuthState(auth);
  const userEmail = user.email;

  useEffect(() => {
    const queryId = localStorage.getItem('queryId');

    const fetchSearchResults = async () => {
      try {
        if (isDefault()) {
          const response = await axios.get(`https://nusmatch-api.onrender.com/profile/results/${queryId}`);
          setResults(response.data.filter((result)=>result.email !== userEmail));
        } else {
          const response = await axios.get(`https://nusmatch-api.onrender.com/group/results/${queryId}`);
          setResults(response.data);
        }         
      } catch (err) {
        console.error(err);
      }   
    };

    fetchSearchResults();
  }, [defaultState]);

  const handleClickOnResults = (e, index) => {
    e.stopPropagation(); 
    const resultDetail = results[index];
    localStorage.setItem('resultId', resultDetail._id );
    if (isDefault()) {
      navigate('/profiledetails');
    } else {
      navigate('/groupdetails');
    }
  };

  const handleToggle = () => {
    setDefaultState(isDefault() ? 'group' : 'profile');
  };

  const isDefault = () => {
    return defaultState === 'profile';
  }

  return (
    <div className='search-results-page'>
      <button className={isDefault() ? 'active-button' : 'inactive-button'} disabled={isDefault()} onClick={handleToggle}>
        Profile
      </button>
      <button className={isDefault() ? 'inactive-button' : 'active-button'} disabled={!isDefault()} onClick={handleToggle}>
        Group
      </button>
      {(isDefault()) && results.map((result, index) => 
        <div key={index} className='individual-results-container' onClick={(e) => handleClickOnResults(e, index)}>
          <h1> {result.name} </h1>
          <h2> {result.status} </h2>
          <h2> Degree: {result?.degree?.join(', ')} </h2>
          <p className='modules-description'> Modules: {result?.currentModules?.join(', ')} </p>
        </div>
      )}
      {(!isDefault()) && results.map((result, index) => 
        <div key={index} className='individual-results-container' onClick={(e) => handleClickOnResults(e, index)}>
          <h1> {result.groupName} </h1>
          <h2> {result.groupStatus} </h2>
          <h2> Description: {result?.groupDescription?.length > 20 ? result?.groupDescription?.slice(0, 20) + '...' : result?.groupDescription} </h2>
          <p className='modules-description'> Common Modules: {result?.modules?.join(', ')} </p>
        </div>
      )}
    </div>
  )
}

export default SearchResults