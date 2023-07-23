import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import GroupRequests from '../GroupRequests';

jest.mock('react-firebase-hooks/auth');

jest.mock('axios', () => ({
    get: jest.fn(),
    put: jest.fn()
}));

describe('GroupRequests', () => {
  test('should get requests upon rendering', async () => {
    useAuthState.mockReturnValue(['e000000@u.nus.edu', false]);
    axios.get.mockResolvedValue({ data: [] });
    
    await act(async() => {
        render(
        <MemoryRouter>
            <GroupRequests/>
        </MemoryRouter>)
    })

    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/group/requests/null');
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/group/other/null');
    });
  });
});