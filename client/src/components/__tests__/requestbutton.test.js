import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RequestButton } from '../requestbutton';
import { MemoryRouter } from 'react-router-dom';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('RequestButton', () => {
  test('should navigate to "/requests" when clicked', () => {

    const { getByText } = render(
      <MemoryRouter>
        <RequestButton navigate={ mockUseNavigate }/>
      </MemoryRouter>
    );

    const requestButton = getByText('Group Requests');
    fireEvent.click(requestButton);

    expect(mockUseNavigate).toHaveBeenCalledWith('/requests');
  });
});
