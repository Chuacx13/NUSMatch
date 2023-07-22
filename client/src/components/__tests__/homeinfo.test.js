import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { AuthInfo, UnauthInfo } from '../homeinfo';
import axios from 'axios'; 

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: () => [{ email: 'e000000@u.nus.edu' }, false], 
}));

jest.mock('axios', () => ({
    get: jest.fn(),
}));
  
describe('AuthInfo', () => {

    test('should call fetchUserProfile when rendered', async () => {
        axios.get.mockResolvedValue({ data: null })
        await act(async () => {
            render(<AuthInfo />);
        });
        expect(axios.get).toHaveBeenCalledWith(
            `http://localhost:3001/profile/e000000@u.nus.edu`
        );
    });

    test('should display correct inputs when there is a profile', async () => {
        axios.get.mockResolvedValue({ data: true }); 

        await act(async () => {
            render(<AuthInfo />);
        });

        expect(screen.getByText('Start Connecting!')).toBeInTheDocument();
        const searchInput = screen.getByPlaceholderText('Search');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).not.toBeDisabled();
        expect(screen.queryByText('Set Up Profile')).not.toBeInTheDocument();
    });

    test('should display correct inputs when there is no profile', async () => {
        axios.get.mockResolvedValue({ data: null }); 

        await act(async () => {
            render(<AuthInfo />);
        });

        expect(
        screen.getByText('Finish setting up your profile before you can gain access to our features!')
        ).toBeInTheDocument();
    
        const searchInput = screen.getByPlaceholderText('Search');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).not.toBeDisabled();
        expect(screen.getByText('Set Up Profile')).toBeInTheDocument();
    });
});

describe('UnauthInfo', () => {
    test('should render the right display', () => {
        render(<UnauthInfo />);

        expect(screen.getByText('NUSMatch')).toBeInTheDocument();
        expect(
          screen.getByText(
            'Looking for project or studymates? Or just want to connect with new people? Look no further!'
          )
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    test('should navigate to /register when the register button is clicked', () => {
        render(<UnauthInfo />);
    
        fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    
        expect(mockUseNavigate).toHaveBeenCalledWith('/register');
    });
});
