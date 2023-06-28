import React from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editgroup.css';
import '../styles/creategroup.css';

function EditGroup() {

  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userEmail = user.email;
  const [group, setGroup] = useState({
    groupName: '',
    groupStatus: '',
    groupDescription: '',
    leader: userEmail,
    modules: [],
    members: []
  });
  const finalGroup = useRef({});
  const [createGroupStatus, setCreateGroupStatus] = useState('');

  useEffect(() => {
    const groupId = localStorage.getItem('resultId');

      const fetchGroupDetails = async() => {
          try {
              const response = await axios.get(`http://localhost:3001/group/other/${groupId}`);
              const updatedMembers = response.data['members'].filter((member) => member !== response.data.leader);
              setGroup({...response.data, ['members']: updatedMembers});
          } catch (err) {
              console.error(err);
          }
      }

    fetchGroupDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const handleAdd = (e) => {
    const name = e.target.name;
    const updatedValue = [...group[name], ""];
    setGroup({ ...group, [name]: updatedValue });
  };

  const handleDelete = (e, index) => {
    const name = e.target.name;
    const updatedValue = [...group[name]];
    updatedValue.splice(index, 1);
    setGroup({ ...group, [name]: updatedValue });
  };

  const handleAddAndChange = (e, index) => {
    const { name, value } = e.target;
    const currentValue = [...group[name]];
    currentValue[index] = value;
    setGroup({ ...group, [name]: currentValue });
  }

  async function areMembersInDatabase(group) {
    const response = await axios.get('http://localhost:3001/auth/emails');
    for (const member of group.members) {
      if (response.data.includes(member)) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };

  async function isLeader() {
    const groupId = localStorage.getItem('resultId');
    const response = await axios.get(`http://localhost:3001/group/other/${groupId}`);
    return userEmail === response.data.leader;
  };

  const updateGroup = async(e) => {
    e.preventDefault();
    try {
      const isExistingUser = await areMembersInDatabase(group);
      const isGroupLeader = await isLeader();
      const groupId = localStorage.getItem('resultId');
      if (isExistingUser && isGroupLeader) {
        //Add self to list of members
        const updatedMembers = [...group.members];
        updatedMembers.push(userEmail);
        //Capitalise all modules added
        let updatedModules = [...group.modules];
        updatedModules = updatedModules.map((module) => module.toUpperCase());
        //Final edits to the 'group' to be saved
        finalGroup.current.value = { ...group, members: updatedMembers, modules: updatedModules };
        //Update group properties in mongodb
        const response = await axios.put(`http://localhost:3001/group/edit/${groupId}`, finalGroup.current.value);
        if (response.data.message === 'There is a duplicate member') {
          setCreateGroupStatus('Check your members. You might have added yourself or duplicated your friends!');
        } else {
          navigate('/groupdetails');
        } 
      } else {
        setCreateGroupStatus('Ensure that your friends have signed up before adding them :)');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const backtoGroupDetails = () => {
    navigate('/groupdetails');
  };

  return (
    <div className='createGroupPage'>
      <form className='createGroupForm' onSubmit={updateGroup}>
        <div className='profileHeaderContainer'> 
          <h1 className='groupFormHeader_2'> Edit &lt; {group.groupName} &gt; </h1>
          {createGroupStatus && <p className='createGroupStatus'>{createGroupStatus}</p>}
          <button type='button' className='editGroupBackButton' onClick={backtoGroupDetails}> Back </button>
        </div>

        <label className='groupFormLabel' htmlFor='groupName'>Group Name</label>
        <input className='editGroupInputs' type='text' id='groupName' name='groupName' value={group.groupName} onChange={handleChange} required />

        <label className='groupFormLabel' htmlFor='groupStatus'>Group Status</label>
        <select className='editGroupInputs' id='groupStatus' name='groupStatus' value={group.groupStatus} onChange={handleChange} required>
          <option value=''>Select a status</option>
          <option value='Private'> Private </option>
          <option value='Public'> Public </option>
        </select>

        <label className='groupFormLabel' htmlFor='groupDescription'>Group Description</label>
        <textarea className='editGroupInputs editGroupTextArea' type='text' id='groupDescription' name='groupDescription' value={group.groupDescription} onChange={handleChange} required />

        <label className='groupFormLabel' htmlFor='modules'>Indicate the modules that your group would be focussing on</label>
        {group.modules.map((modules, index) => (
          <div key={index}>
            <input
              type='text'
              name='modules'
              className='editGroupInputs'
              value={modules}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modifyListButton' type='button' name='modules' onClick={(e) => handleDelete(e, index)}> 
                Delete Module
            </button>
          </div>
        ))}
        <button className='modifyListButton' type="button" name='modules' onClick={handleAdd}>
          Add Module
        </button>
        
        <label className='groupFormLabel' htmlFor='members'>Add your friends!</label>
        {group.members.filter((member) => member !== group.leader).map((member, index) => (
          <div key={index}>
            <input
              type='text'
              name='members'
              className='editGroupInputs'
              value={member}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modifyListButton' type='button' name='members' onClick={(e) => handleDelete(e, index)}> 
                Delete Member
            </button>
          </div>
        ))}
        <button className='modifyListButton' type="button" name='members' onClick={handleAdd}>
          Add Member
        </button>
        <button className='saveButton' onClick={updateGroup}>Save</button>
      </form>
    </div>
  )
}

export default EditGroup