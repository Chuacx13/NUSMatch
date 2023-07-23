import { render, screen, waitFor, act } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import PrivateRoutes from '../PrivateRoutes';
import PublicRoutes from '../PublicRoutes';
import EditProfileRoute from '../EditProfileRoute';
import GroupLeaderRoutes from '../GroupLeaderRoutes';
import Login from '../../pages/Login';
import EditProfile from '../../pages/EditProfile';
import GroupDetails from '../../pages/GroupDetails';
import GroupRequests from '../../pages/GroupRequests';
import EditGroup from '../../pages/EditGroup';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';

jest.mock('react-firebase-hooks/auth');

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('GroupLeaderRoutes', () => {
    
    const initialEntries = [
        '/editgroup',
        '/requests'
    ];
    
    test.each(initialEntries)('should render "Login" page if user is unauthenticated when navigating to "%s"', async (initialEntry) => {
        useAuthState.mockReturnValue([null]);
        axios.get.mockResolvedValue({ data: false });

        await act(async () => {
            render(
            <MemoryRouter initialEntries={[initialEntry]}>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path='/login' exact element={<Login/>}/>
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/groupdetails' element={<GroupDetails/>}/>
                        <Route element={<GroupLeaderRoutes/>}>
                            <Route path='/editgroup' element={<EditGroup/>}/>
                            <Route path='/requests' element={<GroupRequests/>}/>
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
            expect(screen.queryByTestId(`${initialEntry.slice(1)}-page`)).not.toBeInTheDocument();
            expect(screen.getByTestId('login-page')).toBeInTheDocument();
        });
    });

    test.each(initialEntries)('should render "EditProfile" page if user is authenticated and has not set up their profile when navigating to "%s"', async (initialEntry) => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false]);
        axios.get.mockResolvedValue({ data: false });

        await act(async () => {
            render(
            <MemoryRouter initialEntries={[initialEntry]}>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path='/login' exact element={<Login/>}/>
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/groupdetails' element={<GroupDetails/>}/>
                        <Route element={<GroupLeaderRoutes/>}>
                            <Route path='/editgroup' element={<EditGroup/>}/>
                            <Route path='/requests' element={<GroupRequests/>}/>
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
            expect(screen.queryByTestId(`${initialEntry.slice(1)}-page`)).not.toBeInTheDocument();
            expect(screen.getByTestId('editprofile-page')).toBeInTheDocument();
        });
    });

    test.each(initialEntries)('should render respective page if user is authenticated, has set up their profile and is the leader of the group when navigating to "%s"', async (initialEntry) => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false]);
        axios.get.mockResolvedValue({ data: []});

        await act(async () => {
            render(
            <MemoryRouter initialEntries={[initialEntry]}>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path='/login' exact element={<Login/>}/>
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/groupdetails' element={<GroupDetails/>}/>
                        <Route element={<GroupLeaderRoutes/>}>
                            <Route path='/editgroup' element={<EditGroup/>}/>
                            <Route path='/requests' element={<GroupRequests/>}/>
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
            expect(screen.getByTestId(`${initialEntry.slice(1)}-page`)).toBeInTheDocument();
        });
    });

});