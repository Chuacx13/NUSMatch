import React from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../styles/groupdetails.css';

function GroupDetails() {
    
    const navigate = useNavigate();
    const updatedGroup = useRef({});
    const [group, setGroup] = useState({});
    const [memberList, setMemberList] = useState([]);
    const [user] = useAuthState(auth);
    const userEmail = user.email;

    useEffect(() => {
        const groupId = localStorage.getItem('resultId');

        const fetchGroupDetails = async() => {
            try {
                const response = await axios.get(`http://localhost:3001/group/other/${groupId}`);
                updatedGroup.current.value = response.data;
                fetchMemberList(updatedGroup.current.value.members);
                setGroup(updatedGroup.current.value);
            } catch (err) {
                console.error(err);
            }
        }

        const fetchMemberList = async(emailList) => {
            try {
                const tempMemberList = [];
                for (const email of emailList) {
                    const response = await axios.get(`http://localhost:3001/profile/names/${email}`);
                    tempMemberList.push(response.data);
                }
                setMemberList(tempMemberList);
            } catch (err) {
                console.error(err);
            }
        };

        fetchGroupDetails();
    }, [group.members]);

    const goToEditGroup = () => {
        navigate('/editgroup');
    };

    const isLeader = () => {
        return group.leader === userEmail;
    };

    const isMember = () => {
        return group?.members?.includes(userEmail);
    };

    const isPrivateGroup = () => {
        return group.groupStatus === 'Private';
    };

    const goToChat = () => {
        navigate('/groupchat');
    };

    const joinGroup = async() => {
        const groupId = localStorage.getItem('resultId');
        if (isPrivateGroup()) {
            //To DO: Implement sending a join request to the leader
            return;
        } else {
            try {
                const updatedMembers = [...group.members];
                updatedMembers.push(userEmail);
                updatedGroup.current.value = { ...group, members: updatedMembers};
                const response = await axios.put(`http://localhost:3001/group/edit/${groupId}`, updatedGroup.current.value);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const leaveGroup = async() => {
        const groupId = localStorage.getItem('resultId');
        try {
            let updatedMembers = [...group.members];
            updatedMembers = updatedMembers.filter((member) => member !== userEmail);
            const updatedLeader = updatedMembers[0];
            //TO DO: If updateLeader is null, delete the group from database
            updatedGroup.current.value = { ...group, leader: updatedLeader, members: updatedMembers};
            const response = await axios.put(`http://localhost:3001/group/edit/${groupId}`, updatedGroup.current.value);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='group-details-page'>
            <div className='group-details'>
                {(user.email === group.leader) && 
                <button className='edit-group-button' onClick={goToEditGroup} disabled={!isLeader()}> Edit </button>}
                <div className='group-intro'>
                    <h1 className='group-name'> {group.groupName} </h1>
                    <button className={isMember() ? 'member' : 'join-group'} disabled={isMember()} onClick={joinGroup}> 
                        {isMember() ? 'Joined' : group.groupStatus === 'Private' ? 'Request To Join' : 'Join'} 
                    </button>
                    {isMember() && <button className='chat-button' disabled={!isMember()} onClick={goToChat}> Chat </button>}
                    {isMember() && <button className='leave-button' disabled={!isMember()} onClick={leaveGroup}> Leave </button>}
                </div>
                <p className='group-description'> {group.groupDescription} </p>

               
                <h2 className='group-subheaders'> Common Modules </h2>
                <div className='modules-container'>
                    {group.modules?.map((module, index) => (
                        <p className='group-modules' key={index}> {module} </p>
                    ))}
                </div>

                <div className='members-container'> 
                    <h2 className='group-subheaders'> Members </h2>
                    {memberList.map((member, index) => (
                        <p className='group-members' key={index}> {`${index + 1}. ${member}`} </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;