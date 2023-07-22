import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateGroup from '../CreateGroup';
import { useAuthState } from 'react-firebase-hooks/auth';
import React from 'react';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

jest.mock('react-firebase-hooks/auth');

describe('CreateGroup page', () => {
  const mockUser = {
    email: 'e000000@u.nus.edu',
  };

  beforeEach(() => {
    useAuthState.mockReturnValue([mockUser, false, null]);
  });

  const renderCreateGroup = () => {
    render(<CreateGroup />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    renderCreateGroup();
    expect(screen.getByText('Create Your Very Own Group!')).toBeInTheDocument();
    expect(screen.getByLabelText('Group Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Group Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Group Description')).toBeInTheDocument();
    expect(screen.queryByLabelText('Indicate the modules that your group would be focussing on')).toBe(null);
    expect(screen.queryByLabelText('Add your friends by indicating their email addresses below!')).toBe(null);
  });

  test('should update state when input fields change', () => {
    renderCreateGroup();

    const groupNameInput = screen.getByLabelText('Group Name');
    const groupStatusSelect = screen.getByLabelText('Group Status');
    const groupDescriptionInput = screen.getByLabelText('Group Description');

    fireEvent.change(groupNameInput, { target: { value: 'My Group' } });
    fireEvent.change(groupStatusSelect, { target: { value: 'Public' } });
    fireEvent.change(groupDescriptionInput, { target: { value: 'A group for learning' } });

    expect(groupNameInput.value).toBe('My Group');
    expect(groupStatusSelect.value).toBe('Public');
    expect(groupDescriptionInput.value).toBe('A group for learning');
  });

  test('should add a module when the button "Add Module" is clicked and filled in', () => {
    renderCreateGroup();

    fireEvent.click(screen.getByText('Add Module'));
    const addModuleInput = screen.queryByTestId('add-module-input');
    expect(addModuleInput).toBeTruthy();

    const moduleInput = addModuleInput.querySelector('input');
    fireEvent.change(moduleInput, { target: { value: 'EC1101E' } });
    expect(moduleInput.value).toBe('EC1101E');
  });

  test('should delete a module when the button "Delete Module" is clicked', () => {
    renderCreateGroup();

    fireEvent.click(screen.getByText('Add Module'));
    const addModuleInput = screen.queryByTestId('add-module-input');
    expect(addModuleInput).toBeTruthy();

    const moduleInput = addModuleInput.querySelector('input');
    fireEvent.change(moduleInput, { target: { value: 'EC1101E' } });
    expect(moduleInput.value).toBe('EC1101E');

    fireEvent.click(screen.getByText('Delete Module'));
    expect(screen.queryByTestId('add-module-input')).toBe(null);
  });

  test('should add a member when the button "Add Member" is clicked', () => {
    renderCreateGroup();

    fireEvent.click(screen.getByText('Add Member'));
    const addMemberInput = screen.queryByTestId('add-member-input');
    expect(addMemberInput).toBeTruthy();

    const memberInput = addMemberInput.querySelector('input');
    fireEvent.change(memberInput, { target: { value: 'e000001@u.nus.edu' } });
    expect(memberInput.value).toBe('e000001@u.nus.edu');
  });

  test('should delete a member when the button "Delete Member" is clicked', () => {
    renderCreateGroup();

    fireEvent.click(screen.getByText('Add Member'));
    const addMemberInput = screen.queryByTestId('add-member-input');
    expect(addMemberInput).toBeTruthy();

    const memberInput = addMemberInput.querySelector('input');
    fireEvent.change(memberInput, { target: { value: 'e000001@u.nus.edu' } });
    expect(memberInput.value).toBe('e000001@u.nus.edu');

    fireEvent.click(screen.getByText('Delete Member'));
    expect(screen.queryByTestId('add-member-input')).toBe(null);
  });

  test('should submit the form and navigate to groupDetails on successful group creation', async () => {
    jest.mock('axios');
    const mockedAxios = axios.post.mockResolvedValue({ data: { mockGroupData: {} } });
  
    renderCreateGroup();

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockedAxios).toHaveBeenCalledTimes(2);
    });
  
    expect(mockUseNavigate).toHaveBeenCalledWith('/groupdetails');
  });
});