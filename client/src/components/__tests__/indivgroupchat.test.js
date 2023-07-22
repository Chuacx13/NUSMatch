import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { IndivGroupChat } from '../indivgroupchat'; 
import { io } from 'socket.io-client';

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: () => [{ email: 'e000000@u.nus.edu' }, false], 
}));

const mockSocket = {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
};

jest.mock('socket.io-client');
  
const mockGroupId = 'mockGroupId'; 

const mockIsMember = true;

describe('IndivGroupChat', () => {

    test('should join a group with groupId when first rendered', () => {
        window.HTMLElement.prototype.scrollIntoView = function() {}

        render(
            <IndivGroupChat 
                socket={mockSocket} 
                groupId={mockGroupId} 
                isMember={mockIsMember} 
            />);

        expect(mockSocket.emit).toHaveBeenCalledWith('join-chat', mockGroupId);
    });

    test('should remove event listeners "chat-history" and "receive-mesage" from socket when rendered', async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {}
        render(
            <IndivGroupChat 
                socket={mockSocket} 
                groupId={mockGroupId} 
                isMember={mockIsMember} 
            />);

        expect(mockSocket.off).toHaveBeenCalledTimes(2);
    });

    test('should add event listeners "chat-history" and "receive-mesage" from socket when rendered', async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {}
        render(
            <IndivGroupChat 
                socket={mockSocket} 
                groupId={mockGroupId} 
                isMember={mockIsMember} 
            />);

        expect(mockSocket.on).toHaveBeenCalledTimes(2);
    });

    test('should render a message container if messageHistory is not empty', async () => {
        const testMessageHistory = [
            {
              creatorEmail: 'user1@example.com',
              creatorName: 'User 1',
              content: 'Hello there!',
              time: '12:34 PM',
            },
            {
              creatorEmail: 'user2@example.com',
              creatorName: 'User 2',
              content: 'Hi!',
              time: '12:36 PM',
            },
        ];

        mockSocket.on.mockImplementation((event, callback) => {
            if (event === 'chat-history') {
              callback(testMessageHistory);
            }
        });

        await act(async () => {
            render(
                <IndivGroupChat 
                    socket={mockSocket} 
                    groupId={mockGroupId} 
                    isMember={mockIsMember} 
                />);
        });

        await waitFor(() => {
            const messageContainers = screen.queryAllByTestId('message-container');
            expect(messageContainers).toHaveLength(testMessageHistory.length);
        });
    });

    test('should not render a message container if messageHistory is empty', async () => {

        mockSocket.on.mockImplementation((event, callback) => {
            if (event === 'chat-history') {
              callback([]);
            }
        });

        await act(async () => {
            render(
                <IndivGroupChat 
                    socket={mockSocket} 
                    groupId={mockGroupId} 
                    isMember={mockIsMember} 
                />);
        });
        
        await waitFor(() => {
            const messageContainers = screen.queryAllByTestId('message-container');
            expect(messageContainers).toHaveLength(0);
        });
    });

    test('should call sendMessage when Enter key is pressed', () => {
        const sendMessage = jest.fn();

        const { getByTestId } = render(
          <input
            type='text'
            value='Test message'
            placeholder='Write a message'
            onChange={() => {}}
            onKeyDown={(e) => {
              e.code === 'Enter' && sendMessage(); 
            }}
            data-testid='chat-input'
          />
        );
    
        const inputElement = getByTestId('chat-input');
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', keyCode: 13 });
    
        expect(sendMessage).toHaveBeenCalledTimes(1);
    });
});