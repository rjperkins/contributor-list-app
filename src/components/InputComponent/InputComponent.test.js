import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputComponent from './InputComponent';

describe('Form', () => {
  const state = {
    organisation: 'fb',
    repo: 'react'
  };
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const { getByTestId, getByText } = render(<InputComponent state={state} handleSubmit={handleSubmit} handleChange={handleChange} />);

  test('Form onSubmit button fires on button press', () => {
    fireEvent.submit(getByTestId('form'));
    expect(handleSubmit).toHaveBeenCalled()
  })
})