import { render, screen, waitFor, act } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import PrivateRoutes from '../PrivateRoutes';
import PublicRoutes from '../PublicRoutes';
import EditProfileRoute from '../EditProfileRoute';
import GroupMemberRoutes from '../GroupMemberRoutes';
import Login from '../../pages/Login';
import EditProfile from '../../pages/EditProfile';
import GroupDetails from '../../pages/GroupDetails';
import Schedule from '../../pages/Schedule';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';

jest.mock('react-firebase-hooks/auth');

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('GroupMemberRoutes', () => {
    
    test('should render "Login" page if user is unauthenticated when navigating to "/schedule"', async () => {
        useAuthState.mockReturnValue([null]);
        axios.get.mockResolvedValue({ data: false });

        await act(async () => {
            render(
            <MemoryRouter initialEntries={['/schedule']}>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path='/login' exact element={<Login/>}/>
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/groupdetails' element={<GroupDetails/>}/>
                        <Route element={<GroupMemberRoutes/>}>
                            <Route path='/schedule' element={<Schedule/>}/>
                        </Route>
                    </Route>
                    <Route element={<EditProfileRoute />}>
                        <Route path='/editprofile' element={<EditProfile />}/>
                    </Route>
                </Routes>
            </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.queryByTestId('schedule-page')).not.toBeInTheDocument();
            expect(screen.getByTestId('login-page')).toBeInTheDocument();
        });
    });

    test('should render "EditProfile" page if user is authenticated and has not set up their profile when navigating to "/schedule"', async () => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false]);
        axios.get.mockResolvedValue({ data: false });

        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/schedule']}>
                    <Routes>
                        <Route element={<PublicRoutes />}>
                            <Route path='/login' exact element={<Login/>}/>
                        </Route>
                        <Route element={<PrivateRoutes />}>
                            <Route path='/groupdetails' element={<GroupDetails/>}/>
                            <Route element={<GroupMemberRoutes/>}>
                                <Route path='/schedule' element={<Schedule/>}/>
                            </Route>
                        </Route>
                        <Route element={<EditProfileRoute />}>
                            <Route path='/editprofile' element={<EditProfile />}/>
                        </Route>
                    </Routes>
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(screen.queryByTestId('schedule-page')).not.toBeInTheDocument();
            expect(screen.getByTestId('editprofile-page')).toBeInTheDocument();
        });
    });
});