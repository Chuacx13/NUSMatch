import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Register from '../Register';

describe('Register Component', () => {
    test('renders register form correctly', () => {
        const { getByPlaceholderText, getByText } = render(
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        );
    
        const emailInput = screen.getByPlaceholderText('NUSNET ID');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const registerButton = screen.getByText('Register');
        const loginLink = getByText('Get Connected Now!');
    
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
    });
    
    test('displays error message for non-matching passwords', () => {
    render(
        <MemoryRouter> {}
        <Register />
        </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const registerButton = screen.getByText('Register');

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });

    fireEvent.click(registerButton);

    const errorMessage = screen.getByText('Ensure that you keyed in the same password.');
    expect(errorMessage).toBeInTheDocument();
    });

    test('navigate to home page after successful registration', async () => {
        render(
            <MemoryRouter>
            <Register />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText('NUSNET ID');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const registerButton = screen.getByText('Register');

        fireEvent.change(emailInput, { target: { value: 'e000000@u.nus.edu' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });

        fireEvent.click(registerButton);

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
        
    });
});