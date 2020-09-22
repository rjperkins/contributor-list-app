import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListComponent from './ListComponent';

describe('Page renders correctly', () => {
  const contributors = [
    {
      login: "Dicee",
      id: 6486746,
      html_url: "https://github.com/Dicee",
      contributions: 115
    },
    {
      login: "jxw1102",
      id: 1309108,
      html_url: "https://github.com/jxw1102",
      contributions: 87
    }
  ];
  const changePage = jest.fn();
  const { getAllByTestId } = render(<ListComponent contributorList={contributors} error={null} changePage={changePage} pageNum={1} />);

  test('renders user names correctly', () => {
    const list = getAllByTestId('contributor-user').map(li => li.textContent);
    const mockedList = contributors.map(c => c.login)
    expect(list).toEqual(mockedList);
  })
})