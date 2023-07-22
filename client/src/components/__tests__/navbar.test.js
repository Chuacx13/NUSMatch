import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../navbar';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('react-firebase-hooks/auth');

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Navbar component', () => {
    test('should render only login button on home page prior to authentication', () => {
        useAuthState.mockReturnValue([null]);
    
        render(
          <MemoryRouter initialEntries={['/']}>
            <Navbar />
          </MemoryRouter>
        );
    
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(screen.queryByTestId('ChatIcon')).not.toBeInTheDocument();
        expect(screen.queryByTestId('AccountCircleIcon')).not.toBeInTheDocument();
        expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    });

    test('should render group chats and account icon on home page post authentication', () => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false, null]);

        render(
        <MemoryRouter initialEntries={['/']}>
            <Navbar />
        </MemoryRouter>
        );

        expect(screen.queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(screen.getByTestId('ChatIcon')).toBeInTheDocument();
        expect(screen.getByTestId('AccountCircleIcon')).toBeInTheDocument();
        expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    });

    test('should render home and account icon while on "groupchats" page', () => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false, null]);

        render(
        <MemoryRouter initialEntries={['/groupchats']}>
            <Navbar />
        </MemoryRouter>
        );

        expect(screen.queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.queryByTestId('ChatIcon')).not.toBeInTheDocument();
        expect(screen.getByTestId('AccountCircleIcon')).toBeInTheDocument();
        expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    });

    test('should render home, search bar, group chats and account icon while on "searchresults" page', () => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false, null]);

        render(
        <MemoryRouter initialEntries={['/searchresults']}>
            <Navbar />
        </MemoryRouter>
        );

        expect(screen.queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByTestId('ChatIcon')).toBeInTheDocument();
        expect(screen.getByTestId('AccountCircleIcon')).toBeInTheDocument();
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });

    test('should render home, group chats and account icon while on any other page', () => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false, null]);

        render(
        <MemoryRouter initialEntries={['/anyotherpage']}>
            <Navbar />
        </MemoryRouter>
        );

        expect(screen.queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByTestId('ChatIcon')).toBeInTheDocument();
        expect(screen.getByTestId('AccountCircleIcon')).toBeInTheDocument();
        expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    });
});

 
