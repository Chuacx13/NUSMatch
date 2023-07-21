import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ScheduleButton } from '../schedulebutton';
import { MemoryRouter } from 'react-router-dom';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('ScheduleButton', () => {
  test('should navigate to "/schedule" when clicked', () => {

    const { getByText } = render(
      <MemoryRouter>
        <ScheduleButton navigate={ mockUseNavigate }/>
      </MemoryRouter>
    );

    const scheduleButton = getByText('Group Schedule');
    fireEvent.click(scheduleButton);

    expect(mockUseNavigate).toHaveBeenCalledWith('/schedule');
  });
});
