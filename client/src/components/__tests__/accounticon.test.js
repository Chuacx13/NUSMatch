import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AccountIcon } from '../accounticon';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('AccountIcon', () => {
  test('should render the "Account" tooltip when hovered over', () => {
    render(
      <MemoryRouter>
        <AccountIcon />
      </MemoryRouter>
    );
    const tooltip = screen.getByText('Account');
    expect(tooltip).toBeInTheDocument();
  });

  test('should open the dropdown menu when clicked', () => {
    render(
      <MemoryRouter>
        <AccountIcon />
      </MemoryRouter>
    );
    const accountButton = screen.getByLabelText('Account');
    fireEvent.click(accountButton);

    const profileOption = screen.getByText('Profile');
    const groupOption = screen.getByText('Group');
    const logoutOption = screen.getByText('Log Out');
    expect(profileOption).toBeInTheDocument();
    expect(groupOption).toBeInTheDocument();
    expect(logoutOption).toBeInTheDocument();
  });

  test('should close the dropdown menu when clicked again', () => {
    render(
      <MemoryRouter>
        <AccountIcon />
      </MemoryRouter>
    );
    const accountButton = screen.getByLabelText('Account');
    fireEvent.click(accountButton);
    fireEvent.click(accountButton);

    const profileOption = screen.queryByText('Profile');
    const groupOption = screen.queryByText('Group');
    const logoutOption = screen.queryByText('Log Out');
    expect(profileOption).toBeNull();
    expect(groupOption).toBeNull();
    expect(logoutOption).toBeNull();
  });

  test('should navigate to the profile page when the "Profile" option is clicked', () => {

    render(
      <MemoryRouter> 
          <AccountIcon navigate={ mockUseNavigate } />
      </MemoryRouter>);
    const accountButton = screen.getByLabelText('Account');
    fireEvent.click(accountButton);

    const profileOption = screen.getByText('Profile');
    fireEvent.click(profileOption);

    expect(mockUseNavigate).toHaveBeenCalledWith('/profile');
  });

  test('should navigate to the group page when the "Group" option is clicked', () => {

    render(
      <MemoryRouter>
          <AccountIcon navigate={ mockUseNavigate } />
      </MemoryRouter>);
    const accountButton = screen.getByLabelText('Account');
    fireEvent.click(accountButton);

    const groupOption = screen.getByText('Group');
    fireEvent.click(groupOption);

    expect(mockUseNavigate).toHaveBeenCalledWith('/group');
  });
});
