// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
/* 
test('test', () => {
  expect(true).toBe(true);
});
 */

import React from "react";

import { render, cleanup } from "@testing-library/react";

import { fireEvent } from "@testing-library/react";

import App from './app.js'
import { MemoryRouter } from "react-router";


afterEach(cleanup);

describe("Login", () => {
 
  it("render without crashing", () => {
  
    render(<MemoryRouter>
      <App />
    </MemoryRouter>  )
  })

  //it should render nav bar
})