import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Loading from './Loading';
import { useApiUrl } from '../hooks/useApiUrl';
import { IndivGroupChat } from '../components/indivgroupchat';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/groupchats.css';

function GroupChats() {

  const apiUrl = useApiUrl();
  const socket = io.connect(apiUrl);
  const [user, loading] = useAuthState(auth);
  const userEmail = user.email;

  const [groupId, setGroupId] = useState(localStorage.getItem('groupChatId'));
  const [selectedGroup, setSelectedGroup] = useState({
    _id: null,
    groupName: '',
    groupStatus: '',
    groupDescription: '',
    leader: null,
    modules: [],
    members: [],
    userRequests: []
  });
  const [allGroups, setAllGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroupDetails = async() => {
      try {
        const response = await axios.get(`${apiUrl}/group/other/${groupId}`);
        setSelectedGroup(response.data);
      } catch (err) {
        console.error(err);
      } 
    }

    const fetchUserGroups = async() => {
      try {
        const response = await axios.get(`${apiUrl}/group/${userEmail}`);
        setAllGroups(response.data);
      } catch (err) {
        console.error(err);
      } 
    }; 

    fetchUserGroups();
    if (groupId) {
      fetchGroupDetails();
    }
    setIsLoading(false);
  }, [groupId])

  const isMember = selectedGroup?.members.includes(userEmail);

  if (isLoading || loading) {
    return <Loading />
  }

  const changeGroupChat = (e, index) => {
    e.preventDefault();
    setGroupId(allGroups[index]._id);
    localStorage.setItem('groupChatId', allGroups[index]._id);
  };

  return (
    <>
      {allGroups.length === 0 ? 
      <div className='no-group-chats-page'> 
        <h1>Ready to Connect?</h1>
        <p>Join or create a group and start chatting with your friends!</p>
      </div> :
      <div className='group-chats-page'>
        <div className='all-chats'>
          {allGroups.map((group, index) => 
          (
            <div key={index} className='individual-group-chat-container' onClick={(e) => changeGroupChat(e, index)}>  
              <h1> {group.groupName} </h1>
            </div>
          ))}
        </div>
        {selectedGroup._id && <div className='selected-chat'> 
          <h1 className='chat-header'> {selectedGroup.groupName} </h1>
          <IndivGroupChat socket={socket} groupId={groupId} isMember={isMember} groupName={selectedGroup.groupName}/>
        </div>
        }
      </div>
      }
    </>
  );
}


export default GroupChats