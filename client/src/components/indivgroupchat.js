import React, { useState, useEffect, useRef } from 'react';
import Loading from '../pages/Loading';
import { SendMessageButton } from './sendmessagebutton';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/indivgroupchat.css';

export const IndivGroupChat = ({ socket, groupId, isMember }) => {

  const [user, loading] = useAuthState(auth);
  const userEmail = user.email;

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const chatBodyRef = useRef(null);

  useEffect(() => {

    const joinChat = async () => {
      await socket.emit('join-chat', groupId);
    };

    const updateChat = () => {
      socket.off('chat-history');
      socket.off('receive-message');
      setMessageHistory([]);
      joinChat();
    };
  
    if (groupId) {
      updateChat();
    }

    socket.on('chat-history', (data) => {
      setMessageHistory(data);
    });

    socket.on('receive-message', (data) => {
      setMessageHistory((list) => [...list, data]);
    });

    return () => {
      socket.off('chat-history');
      socket.off('receive-message');
    };
  }, [socket]);

  useEffect(() => {
    const scrollToBottom = () => {
      chatBodyRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    scrollToBottom();
  }, [messageHistory]);

  const sendMessage = async () => {

    if (currentMessage !== "") {
      const messageData = {
        groupId: groupId,
        content: currentMessage,
        creatorEmail: userEmail,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      await socket.emit('send-message', messageData);
      setCurrentMessage('');
    }
  };

  if (!isMember) {
    return null;
  };
  
  if (loading) {
    return <Loading />
  }

  return (
    <div className='individual-group-chat'>
      <div className='chat-body'>
        {messageHistory.map((message, index) => (
          <div key={index} data-testid='message-container' className='message-data' id={user.email === message.creatorEmail ? 'creator' : 'other'}>
            <p className='message-creator'>{user.email !== message.creatorEmail && message.creatorName}</p>
            <p className='message-content'>{message.content}</p>
            <p className='message-time'>{message.time}</p>
          </div>
        ))}
        <div ref={chatBodyRef}></div>
      </div>
      <div className='chat-inputs'> 
        <input 
          type='text'
          value={currentMessage}
          placeholder='Write a message'
          onChange={(e) => { setCurrentMessage(e.target.value) }}
          onKeyDown={(e) => { e.code === 'Enter' && sendMessage() }}
        />
        <SendMessageButton onClick={sendMessage}/>
      </div>
    </div>
  )
}

