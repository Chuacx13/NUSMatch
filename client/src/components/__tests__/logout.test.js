import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logout from '../logout';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signOut: jest.fn(),
}));

const mockUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate, 
}));

describe('Logout', () => {
  test('should call firebase signOut and navigate to "/" when clicked', async () => {
    const mockSignOut = signOut;
    const { getByText } = render(<Logout />);

    const logoutButton = getByText('Log Out');
    fireEvent.click(logoutButton);

    expect(mockSignOut).toHaveBeenCalled();

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockUseNavigate).toHaveBeenCalledWith('/');
  });

});
