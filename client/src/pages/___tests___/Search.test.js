import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom'
import { render, cleanup } from '@testing-library/react';
import Search from '../Search';


afterEach(cleanup);

describe('Search page', () => {
  it('should render without crashing', () => {
    render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
    )
  });

  // it('should render 10 cards to start', () => {

  //   const { getByTestId } = render(
  //   <MemoryRouter>
  //     <Search />
  //   </MemoryRouter>
  //   );
  //   const { getByText } = within(getByTestId('card'))
  //   expect(getByText('AMC')).toBeInTheDocument()
  // })
});

