import React from 'react';
import axios from 'axios';
import Loading from '../pages/Loading';
import { useApiUrl } from '../hooks/useApiUrl';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GroupAppIcon } from '../components/groupappicon';
import { RequestButton } from '../components/requestbutton';
import { EditGroupButton } from '../components/editgroupbutton';
import { IndivGroupChatButton } from '../components/indivgroupchatbutton';
import { ScheduleButton } from '../components/schedulebutton';
import { LeaveButton } from '../components/leavebutton';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/groupdetails.css';

function GroupDetails() {
    
    const apiUrl = useApiUrl();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const userEmail = user.email;

    const [group, setGroup] = useState({
        _id: null,
        groupName: '',
        groupStatus: '',
        groupDescription: '',
        leader: userEmail,
        modules: [],
        members: [],
        userRequests: [],
        scheduleId: null
    });
    const [nameList, setNameList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [groupFunctions, setGroupFunctions] = useState(false);
    
    useEffect(() => {
        const groupId = localStorage.getItem('groupId');

        const fetchGroupDetails = async() => {
            try {
                const response = await axios.get(`${apiUrl}/group/other/${groupId}`);
                await fetchNameList(response.data.members);
                setGroup(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
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
    }, [group.members, group.userRequests]);

    const isLeader = () => {
        return group.leader === userEmail;
    };

    const isMember = () => {
        return group.members.includes(userEmail);
    };

    const isPrivateGroup = () => {
        return group.groupStatus === 'Private';
    };

    const isRequested = () => {
        return group.userRequests.includes(userEmail);
    }

    const showGroupFunctions = () => {
        setGroupFunctions(!groupFunctions);
    };

    const joinGroup = async() => {
        const groupId = localStorage.getItem('groupId');
        if (isPrivateGroup()) {
            try {
                const data = {
                    groupData: group,
                    userEmail: userEmail
                };
                await axios.put(`${apiUrl}/group/request/${groupId}`, data);
            } catch (err) {
                console.error(err);
            }
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
        const groupId = localStorage.getItem('groupId');
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

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='group-details-page'>
            <div className='group-details'>

                <div className='group-intro'>
                    <h1 className='group-name'> {group.groupName} </h1>
                    <button className={isMember() || isRequested() ? 'member-or-requested' : 'join-group'} disabled={isMember() || isRequested()} onClick={joinGroup}> 
                        {isMember() ? 'Joined' : 
                            isRequested() ? 'Request Sent' : 
                            group.groupStatus === 'Private' ? 'Request To Join' 
                            : 'Join'} 
                    </button>
                    {isMember() && <GroupAppIcon onClick={showGroupFunctions}/>}
                </div>

                {groupFunctions && isMember() && 
                    <div className='group-functions'> 
                        {isLeader() && <RequestButton />}
                        {isLeader() && <EditGroupButton />}
                        {isMember() && <IndivGroupChatButton groupChatId={group._id}/>}
                        {isMember() && <ScheduleButton />}
                        {isMember() && <LeaveButton onClick={leaveGroup} />} 
                    </div>}
                    
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