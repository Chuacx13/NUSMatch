import React from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editform.css';

function CreateGroup() {

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

  async function isUserInDatabase(group) {
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

  const saveGroup = async(e) => {
    e.preventDefault();
    try {
      const isExistingUser = await isUserInDatabase(group);
      if (isExistingUser) {
        //Add self into list of users
        const updatedMembers = [...group.members];
        updatedMembers.push(userEmail);
        //Capitalise all modules added
        let updatedModules = [...group.modules];
        updatedModules = updatedModules.map((module) => module.toUpperCase());
        //Final edits to the 'group' to be saved
        finalGroup.current.value = { ...group, members: updatedMembers, modules: updatedModules };
        //Create group in mongodb
        const response = await axios.post('http://localhost:3001/group/create', finalGroup.current.value );
        if (response.data.message === 'There is a duplicate member') {
          setCreateGroupStatus('Check your members. You might have added yourself or duplicated your friends!');
        } else {
          navigate('/group');
        } 
      } else {
        setCreateGroupStatus('Ensure that your friends have signed up before adding them :)');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='edit-form-page'>
      <form className='edit-form' onSubmit={saveGroup}>
        <h1 className='edit-form-header'> Create Your Very Own Group! </h1>
        {createGroupStatus && <p className='create-group-status'>{createGroupStatus}</p>}

        <label className='edit-form-label' htmlFor='groupName'>Group Name</label>
        <input className='edit-form-inputs' type='text' id='groupName' name='groupName' value={group.groupName} onChange={handleChange} required />

        <label className='edit-form-label' htmlFor='groupStatus'>Group Status</label>
        <select className='edit-form-inputs' id='groupStatus' name='groupStatus' value={group.groupStatus} onChange={handleChange} required>
          <option value=''>Select a status</option>
          <option value='Private'> Private </option>
          <option value='Public'> Public </option>
        </select>

        <label className='edit-form-label' htmlFor='groupDescription'>Group Description</label>
        <textarea className='edit-form-inputs edit-group-text-area' type='text' id='groupDescription' name='groupDescription' value={group.groupDescription} onChange={handleChange} required />

        <label className='edit-form-label' htmlFor='modules'>Indicate the modules that your group would be focussing on</label>
        {group.modules.map((modules, index) => (
          <div key={index}>
            <input
              type='text'
              name='modules'
              className='edit-form-inputs'
              value={modules}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modify-list-button' type='button' name='modules' onClick={(e) => handleDelete(e, index)}> 
                Delete Module
            </button>
          </div>
        ))}
        <button className='modify-list-button' type="button" name='modules' onClick={handleAdd}>
          Add Module
        </button>
        
        <label className='edit-form-label' htmlFor='members'>Add your friends!</label>
        {group.members.map((member, index) => (
          <div key={index}>
            <input
              type='text'
              name='members'
              className='edit-form-inputs'
              value={member}
              onChange={(e) => handleAddAndChange(e, index)}
              required
            /> 
            <button className='modify-list-button' type='button' name='members' onClick={(e) => handleDelete(e, index)}> 
                Delete Member
            </button>
          </div>
        ))}
        <button className='modify-list-button' type="button" name='members' onClick={handleAdd}>
          Add Member
        </button>
        <button className='save-button' onClick={saveGroup}>Create</button>
      </form>
    </div>
  )
}

export default CreateGroup