import React from 'react';
import axios from 'axios';
import { useApiUrl } from '../hooks/useApiUrl';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editform.css';

function CreateGroup() {

  const apiUrl = useApiUrl();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userEmail = user.email;
  const [group, setGroup] = useState({
    groupName: '',
    groupStatus: '',
    groupDescription: '',
    leader: userEmail,
    modules: [],
    members: [],
    userRequests: []
  });
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

  async function areMembersProfileCreated(group) {
    if (group.members.length === 0) {
      return true;
    } else {
      const emails = group.members.join(',');
      const response = await axios.get(`${apiUrl}/profile/users/${emails}`)
      return response.data;
    }
  };

  async function areMembersRegistered(group) {
    if (group.members.length === 0) {
      return true;
    } else {
      const emails = group.members.join(',');
      const response = await axios.get(`${apiUrl}/auth/users/${emails}`)
      return response.data;
    }
  };

  async function isMoreThanSixModulesAdded(group) {
    return group.modules.length > 6;
  };

  const saveGroup = async(e) => {
    e.preventDefault();
    try {
      const membersProfileCreated = await areMembersProfileCreated(group);
      const membersRegistered = await areMembersRegistered(group);
      const moreThanSixModulesAdded = await isMoreThanSixModulesAdded(group);
      if (moreThanSixModulesAdded) {
        setCreateGroupStatus('Only 6 modules can be added!');
        window.scrollTo(0, 0);
      } else if (membersProfileCreated) {
        const data = {
          groupData: group,
          userEmail: userEmail
        }
        const response = await axios.post(`${apiUrl}/group`, data);
        if (response.data.message === 'There is a duplicate member') {
          setCreateGroupStatus('Check your members. You might have added yourself or duplicated your friends!');
          window.scrollTo(0, 0);
        } else if (response.data.message === 'Members may not wish to be added') {
          setCreateGroupStatus('Check that your friends have set their account\'s status to \'Active\' before adding them');
          window.scrollTo(0, 0);
        } else {
          await axios.post(`${apiUrl}/schedule/${response.data._id}`);
          localStorage.setItem('groupId', response.data._id);
          navigate('/groupdetails');
        } 
      } else if (!membersRegistered) {
        setCreateGroupStatus('Ensure that your friends have registered before adding them :)');
        window.scrollTo(0, 0);
      } else {
        setCreateGroupStatus('Ensure that your friends have set up their profile before adding them :)');
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='edit-form-page' data-testid='creategroup-page'>
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
          <div key={index} data-testid='add-module-input'>
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
        
        <label className='edit-form-label' htmlFor='members'>Add your friends by indicating their email addresses below!</label>
        {group.members.map((member, index) => (
          <div key={index} data-testid='add-member-input'>
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
        <button className='save-button'>Create</button>
      </form>
    </div>
  )
}

export default CreateGroup