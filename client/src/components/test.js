import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export const UserEmailList = () => {
  const [userEmails, setUserEmails] = useState([]);

  const fetchUserEmails = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/getUsers');
      setUserEmails(response.data);
      console.log(userEmails);
    } catch (error) {
      console.error('Error fetching user emails:', error.message);
    }
  };

  console.log(userEmails.filter((user) => user.email === 'e0958059@u.nus.edu').map((user) => user.emailVerified));

  useEffect(() => {
   fetchUserEmails();
  }, []);

  return (
    <div>
      <h2>User Email List</h2>
      <button onClick={fetchUserEmails}> update </button>
      <h1>
        {userEmails.map((user) => {
          return (
          <div>{user.email}</div>
          );
        })}
      </h1>
    </div>
  );
};


/* WORKING
const [userEmails, setUserEmails] = useState([]);

  useEffect(() => {
        Axios.get('http://localhost:3001/getEmails').then((response) => { setUserEmails(response.data);
      });
  }, []);

  return (
    <div>
      <h2>User Email List</h2>
      <h1>
        {userEmails.map((email) => {
          return (
          <div>{email}</div>
          );
        })}
      </h1>
    </div>
  );
  */


  /* CHECKBOX (DISABLE BUTTON)
  const [isChecked, setIsChecked] = useState(false);

  const changeCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  disabled={!isChecked} ==> insert into button
  */

  /*  FETCH USER LIST

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getUsers');
      setUserList(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  */