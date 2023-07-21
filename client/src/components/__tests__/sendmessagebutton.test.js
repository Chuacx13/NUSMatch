import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SendMessageButton } from '../sendmessagebutton';

describe('SendMessageButton', () => {
  test('should call the onClick function when clicked', () => {
    const mockOnClick = jest.fn();

    const { getByLabelText } = render(<SendMessageButton onClick={mockOnClick} />);

    const sendMessageButton = getByLabelText('Send-Message');
    fireEvent.click(sendMessageButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
