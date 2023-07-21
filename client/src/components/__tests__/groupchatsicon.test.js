import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { GroupChatsIcon } from '../groupchatsicon';
import { MemoryRouter } from 'react-router-dom';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('GroupChatsButton', () => {
  test('should render the "Group Chats" tooltip when hovered over', () => {
    render(
      <MemoryRouter>
        <GroupChatsIcon />
      </MemoryRouter>
    );
    const tooltip = screen.getByText('Group Chats');
    expect(tooltip).toBeInTheDocument();
  })

  test('should navigate to "/groupchats" when clicked', () => {

    const { getByLabelText } = render(
      <MemoryRouter>
        <GroupChatsIcon navigate={ mockUseNavigate }/>
      </MemoryRouter>
    );

    const groupChatsIcon = getByLabelText('Group Chats');
    fireEvent.click(groupChatsIcon);

    expect(mockUseNavigate).toHaveBeenCalledWith('/groupchats');
  });
});
