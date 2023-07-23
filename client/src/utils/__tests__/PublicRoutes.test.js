import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import PublicRoutes from '../PublicRoutes';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Home from '../../pages/Home';
import ForgotPassword from '../../pages/ForgotPassword';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('react-firebase-hooks/auth');

describe('PublicRoutes', () => {
    
    const initialEntries = [
        '/login',
        '/register',
        '/forgotpassword',
    ];
    
    test.each(initialEntries)('should render "Home" page if user is authenticated when navigating to "%s"', async (initialEntry) => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false]);
    
        render(
        <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>
            <Route path='/' exact element={<Home />} />
            <Route element={<PublicRoutes />}>
                <Route path='/login' exact element={<Login />} />
                <Route path='/register' exact element={<Register />} />
                <Route path='/forgotpassword' exact element={<ForgotPassword />} />
            </Route>
            </Routes>
        </MemoryRouter>
        );
    
        await waitFor(() => {
            expect(screen.queryByTestId(`${initialEntry.slice(1)}-page`)).not.toBeInTheDocument();
            expect(screen.getByTestId('home-page')).toBeInTheDocument();
        });
    });

    test.each(initialEntries)('should render the respective page if user is unauthenticated when navigating to "%s"', async (initialEntry) => {
        useAuthState.mockReturnValue([null]);
    
        render(
          <MemoryRouter initialEntries={[initialEntry]}>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route element={<PublicRoutes />}>
                <Route path='/login' exact element={<Login />} />
                <Route path='/register' exact element={<Register />} />
                <Route path='/forgotpassword' exact element={<ForgotPassword />} />
              </Route>
            </Routes>
          </MemoryRouter>
        );
    
        await waitFor(() => {
          expect(screen.getByTestId(`${initialEntry.slice(1)}-page`)).toBeInTheDocument();
          expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
        });
    });

});