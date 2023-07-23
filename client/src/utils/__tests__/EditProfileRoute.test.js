import { render, screen, waitFor } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import EditProfileRoute from '../EditProfileRoute';
import PublicRoutes from '../PublicRoutes';
import EditProfile from '../../pages/EditProfile';
import Login from '../../pages/Login';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('react-firebase-hooks/auth');

describe('EditProfileRoute', () => {
  test('should render "EditProfile" page if user is authenticated when navigating to "/editprofile"', async () => {

    useAuthState.mockReturnValue(['e000000@u.nus.edu', false]);

    render(
        <MemoryRouter initialEntries={['/editprofile']}>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path='/login' exact element={<Login/>}/>
                </Route>
                <Route element={<EditProfileRoute />}>
                    <Route path='/editprofile' element={<EditProfile/>}/>
                </Route>
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
        expect(screen.getByTestId('editprofile-page')).toBeInTheDocument();
    });
  });

  test('renders "Login" page if user is not authenticated when navigating to "/editprofile"', async () => {

    useAuthState.mockReturnValue([null]);

    render(
        <MemoryRouter initialEntries={['/editprofile']}>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path='/login' exact element={<Login/>}/>
                </Route>
                <Route element={<EditProfileRoute />}>
                    <Route path='/editprofile' element={<EditProfile/>}/>
                </Route>
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
        expect(screen.queryByTestId('editprofile-page')).not.toBeInTheDocument();
    });
  });

});
