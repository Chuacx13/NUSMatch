import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EditGroupButton } from '../editgroupbutton';
import { MemoryRouter } from 'react-router-dom';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('EditGroupButton', () => {
  test('should navigate to "/editgroup" when clicked', () => {

    const { getByText } = render(
      <MemoryRouter>
        <EditGroupButton navigate={ mockUseNavigate }/>
      </MemoryRouter>
    );

    const editButton = getByText('Edit Group');
    fireEvent.click(editButton);

    expect(mockUseNavigate).toHaveBeenCalledWith('/editgroup');
  });
});
