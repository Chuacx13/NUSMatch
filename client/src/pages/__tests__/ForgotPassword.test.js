import Firebase from '../../firebase';
import { authMock } from '../../setupTests';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from '../ForgotPassword';

Firebase.auth = authMock;

//Auth state is undefined
describe('Forgot Password Component', () => {
    test('renders forgot password form correctly', () => {
        const { getByPlaceholderText, getByText } = render(
          <MemoryRouter>
            <ForgotPassword />
          </MemoryRouter>
        );
    
        const emailInput = screen.getByPlaceholderText('NUSNET ID');
        const sendPasswordResetEmailButton = screen.getByText('Send Password Reset Email');
        const loginLink = getByText('Get Connected Now!');
    
        expect(emailInput).toBeInTheDocument();
        expect(sendPasswordResetEmailButton).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
    });

    test('should display user does not exist when sending password reset email', async () => {
        const sendPasswordResetEmailMock = jest.fn(); 

        Firebase.auth.mockReturnValue({
            sendPasswordResetEmail: sendPasswordResetEmailMock,
        });

        render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>);
    
        const emailInput = screen.getByPlaceholderText('NUSNET ID');
        fireEvent.change(emailInput, { target: { value: 'testuser' } });
        fireEvent.click(screen.getByText('Send Password Reset Email'));

        await waitFor(() => {
            expect(screen.getByText('Account does not exist')).toBeInTheDocument();
        });
    });
});