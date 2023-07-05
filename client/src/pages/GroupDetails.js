import React from 'react';
import axios from 'axios';
import { useApiUrl } from '../hooks/useApiUrl';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/groupdetails.css';

function GroupDetails() {
    
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
        members: []
    });
    const [nameList, setNameList] = useState([]);
    

    useEffect(() => {
        const groupId = localStorage.getItem('resultId');

        const fetchGroupDetails = async() => {
            try {
                const response = await axios.get(`${apiUrl}/group/other/${groupId}`);
                await fetchNameList(response.data.members);
                setGroup(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        const fetchNameList = async(emailList) => {
            try {
                const emails = emailList.join(',');
                const response = await axios.get(`${apiUrl}/profile/names/${emails}`);
                setNameList(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        
        fetchGroupDetails();
    }, [group.members]);

    const isLeader = () => {
        return group.leader === userEmail;
    };

    const isMember = () => {
        return group.members.includes(userEmail);
    };

    const isPrivateGroup = () => {
        return group.groupStatus === 'Private';
    };

    const goToEditGroup = () => {
        navigate('/editgroup');
    };

    const goToChat = () => {
        navigate('/groupchat');
    };

    //ATTENTION!
    const joinGroup = async() => {
        const groupId = localStorage.getItem('resultId');
        if (isPrivateGroup()) {
            //To DO: Implement sending a join request to the leader
            return;
        } else {
            try {
                const data = {
                    groupData: group,
                    userEmail: userEmail
                }
                await axios.put(`${apiUrl}/group/join/${groupId}`, data);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const leaveGroup = async() => {
        const groupId = localStorage.getItem('resultId');
        try {
            const data = {
                groupData: group,
                userEmail: userEmail
            }
            const response = await axios.put(`${apiUrl}/group/leave/${groupId}`, data);
            if (response.data.message === 'Group deleted successfully') {
                navigate('/group');
            }
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
                    {nameList.map((member, index) => (
                        <p className='group-members' key={index}> {`${index + 1}. ${member}`} </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;