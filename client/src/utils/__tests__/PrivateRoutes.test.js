import 'setimmediate'; 
import { render, screen, waitFor, act } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import PrivateRoutes from '../PrivateRoutes';
import PublicRoutes from '../PublicRoutes';
import EditProfileRoute from '../EditProfileRoute';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import ProfileDetails from '../../pages/ProfileDetails';
import EditProfile from '../../pages/EditProfile';
import Group from '../../pages/Group';
import CreateGroup from '../../pages/CreateGroup';
import GroupChats from '../../pages/GroupChats';
import GroupDetails from '../../pages/GroupDetails';
import SearchResults from '../../pages/SearchResults';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';

jest.mock('react-firebase-hooks/auth');

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('PrivateRoutes', () => {
    
    const initialEntries = [
        '/profile',
        '/profiledetails',
        '/group',
        '/creategroup',
        '/groupchats',
        '/groupdetails',
        '/searchresults'
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
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/profiledetails' element={<ProfileDetails/>}/>
                        <Route path='/group' element={<Group/>}/>
                        <Route path='/creategroup' element={<CreateGroup/>}/>
                        <Route path='/groupchats' element={<GroupChats/>}/>
                        <Route path='/groupdetails' element={<GroupDetails/>}/>
                        <Route path='/searchresults' element={<SearchResults/>}/>
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
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/profiledetails' element={<ProfileDetails/>}/>
                        <Route path='/group' element={<Group/>}/>
                        <Route path='/creategroup' element={<CreateGroup/>}/>
                        <Route path='/groupchats' element={<GroupChats/>}/>
                        <Route path='/groupdetails' element={<GroupDetails/>}/>
                        <Route path='/searchresults' element={<SearchResults/>}/>
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

    test.each(initialEntries)('should render respective page if user is authenticated and has set up their profile when navigating to "%s"', async (initialEntry) => {
        useAuthState.mockReturnValue(['e000000@u.nus.edu', false, null]);
        axios.get.mockResolvedValue({ data: [] });

        await act(async () => {
            render(
            <MemoryRouter initialEntries={[initialEntry]}>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path='/login' exact element={<Login/>}/>
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/profiledetails' element={<ProfileDetails/>}/>
                        <Route path='/group' element={<Group/>}/>
                        <Route path='/creategroup' element={<CreateGroup/>}/>
                        <Route path='/groupchats' element={<GroupChats/>}/>
                        <Route path='/groupdetails' element={<GroupDetails/>}/>
                        <Route path='/searchresults' element={<SearchResults/>}/>
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