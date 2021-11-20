import React from 'react'
import { render, cleanup } from '@testing-library/react';
import Search from '../Search';

afterEach(cleanup);

// test('test', () => {
//   expect(true).toBe(true);
// });

describe('Search page', () => {
  it('should render without crashing', () => {
    render(<Search />);
  });
});
