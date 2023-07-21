import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { AccountIcon } from './accounticon';

describe('AccountIcon', () => {
  test('should render the "Account" tooltip', () => {
    render(
      <MemoryRouter>
        <AccountIcon />
      </MemoryRouter>
    );
    const tooltip = screen.getByText('Account');
    expect(tooltip).toBeInTheDocument();
  });

  test('should open the menu when clicked', () => {
    render(
        <MemoryRouter>
          <AccountIcon />
        </MemoryRouter>
    );
    const iconButton = screen.getByLabelText('Account');
    fireEvent.click(iconButton);

    const profileOption = screen.getByText('Profile');
    const groupOption = screen.getByText('Group');
    expect(profileOption).toBeInTheDocument();
    expect(groupOption).toBeInTheDocument();
  });

  test('should navigate to the profile page when the "Profile" option is clicked', () => {
    // You can use a mock navigate function here and pass it as a prop to AccountIcon
    const mockNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate,
    }));

    render(
        <MemoryRouter> 
            <AccountIcon navigate={mockNavigate} />
        </MemoryRouter>);
    const iconButton = screen.getByLabelText('Account');
    fireEvent.click(iconButton);

    const profileOption = screen.getByText('Profile');
    fireEvent.click(profileOption);

    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  test('should navigate to the group page when the "Group" option is clicked', () => {
    // You can use a mock navigate function here and pass it as a prop to AccountIcon
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate,
    }));

    render(
        <MemoryRouter>
            <AccountIcon navigate={mockNavigate} />
        </MemoryRouter>);
    const iconButton = screen.getByLabelText('Account');
    fireEvent.click(iconButton);

    const groupOption = screen.getByText('Group');
    fireEvent.click(groupOption);

    expect(mockNavigate).toHaveBeenCalledWith('/group');
  });
});
