import React from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editform.css';

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
  const [createGroupStatus, setCreateGroupStatus] = useState('');

  useEffect(() => {
    const groupId = localStorage.getItem('resultId');

      const fetchGroupDetails = async() => {
          try {
              const response = await axios.get(`http://localhost:3001/group/edits/${groupId}`);
              setGroup(response.data);
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
    const emails = group.members.join(',');
    const response = await axios.get(`http://localhost:3001/auth/users/${emails}`)
    return response.data;
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
        const data = {
          groupData: group,
          userEmail: userEmail
        }
        const response = await axios.put(`http://localhost:3001/group/${groupId}`, data);
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
    <div className='edit-form-page'>
      <form className='edit-form' onSubmit={updateGroup}>
        <div className='edit-form-header-container'> 
          <h1 className='edit-form-header'> Edit &lt; {group.groupName} &gt; </h1>
          <button type='button' className='edit-form-back-button' onClick={backtoGroupDetails}> Back </button>
        </div>
        {createGroupStatus && <p className='create-group-status'>{createGroupStatus}</p>}

        <label className='edit-form-label' htmlFor='groupName'>Group Name</label>
        <input className='edit-form-inputs' type='text' id='groupName' name='groupName' value={group.groupName} onChange={handleChange} required />

        <label className='edit-form-label' htmlFor='groupStatus'>Group Status</label>
        <select className='edit-form-inputs' id='groupStatus' name='groupStatus' value={group.groupStatus} onChange={handleChange} requirformed>
          <option value=''>Select a status</option>
          <option value='Private'> Private </option>
          <option value='Public'> Public </option>
        </select>

        <label className='edit-form-label' htmlFor='groupDescription'>Group Description</label>
        <textarea className='edit-form-inputs edit-form-text-area' type='text' id='groupDescription' name='groupDescription' value={group.groupDescription} onChange={handleChange} required />

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
        
        <label className='edit-form-label' htmlFor='members'>Add your friends by indicating their email addresses below!</label>
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
        <button className='save-button' onClick={updateGroup}>Save</button>
      </form>
    </div>
  )
}

export default EditGroup