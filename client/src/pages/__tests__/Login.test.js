import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios'; 
import Login from '../Login';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: null })), 
}));

describe('Login Component', () => {
  it('renders login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('NUSNET ID');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');
    const forgotPasswordLink = getByText('Forgot your password?');
    const registerLink = getByText('New to NUSMatch?');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it('redirects to homepage after successful login', async () => {
    axios.get.mockResolvedValue({ data: true });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('NUSNET ID');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'e0000000@u.nus.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  it('displays error message for user does not exist', async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('NUSNET ID');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'e0000000@u.nus.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('User does not exist. Sign up first!');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display email not verified', async () => {
    axios.get.mockResolvedValue({ data: false });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('NUSNET ID');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'e0000000@u.nus.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        const errorMessage = getByText('Email not verified. Verify before logging in');
        expect(errorMessage).toBeInTheDocument();
    });
  });

  it('displays error message for invalid password', async () => {
    axios.get.mockRejectedValue({ code: 'auth/wrong-password' });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('NUSNET ID');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log In');

    fireEvent.change(emailInput, { target: { value: 'e0000000@u.nus.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('NUSNET ID and Password do not match.');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});