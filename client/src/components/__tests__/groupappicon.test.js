import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GroupAppIcon } from '../groupappicon';

describe('GroupAppIcon', () => {
  test('should call the onClick function when clicked', () => {
    const mockOnClick = jest.fn();

    const { getByLabelText } = render(<GroupAppIcon onClick={mockOnClick} />);

    const groupAppIcon = getByLabelText('Group Functions');
    fireEvent.click(groupAppIcon);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
