import React from 'react'
import {MemoryRouter} from 'react-router-dom'
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

  it('should have 10 cards to start', () => {
    
  })
});


// test('test', () => {
//   expect(true).toBe(true);
// });

// describe('Search page', () => {
//   it('should render without crashing', () => {
//     render(
//     <BrowserRouter>
//       <Routes>
//         <Route path='/search' element={<Search />} />
//       </Routes>
//     </BrowserRouter>);
//   });
// });

