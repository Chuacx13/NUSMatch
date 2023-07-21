import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IndivGroupChatButton } from '../indivgroupchatbutton';
import { MemoryRouter } from 'react-router-dom';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate, 
}));

describe('IndivGroupChatButton', () => {
  test('should navigate to "/groupchats" and save groupChatId in localStorage when clicked', () => {
    const groupChatId = 'test-group-123';
    const { getByText } = render(
        <MemoryRouter>
            <IndivGroupChatButton groupChatId={groupChatId}/>
        </MemoryRouter>);

    const groupChatButton = getByText('Group Chat');
    fireEvent.click(groupChatButton);

    expect(mockUseNavigate).toHaveBeenCalledWith('/groupchats');
    expect(localStorage.getItem('groupChatId')).toBe(groupChatId);
  });
  
});
