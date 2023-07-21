import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LeaveButton } from '../leavebutton';

describe('LeaveButton', () => {
  test('should call the onClick function when clicked', () => {
    const mockOnClick = jest.fn();

    const { getByText } = render(
      <LeaveButton onClick={mockOnClick}/>
    );

    const leaveButton = getByText('Leave');
    fireEvent.click(leaveButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
