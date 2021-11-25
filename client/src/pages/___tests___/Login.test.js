import React from "react";

import { render, cleanup } from "@testing-library/react";

import { fireEvent } from "@testing-library/react";

import Login from '../Login.jsx'
import { MemoryRouter } from "react-router";


afterEach(cleanup);

describe("Login", () => {
 
  it("render without crashing", () => {
   const { getByText, getByPlaceholderText, queryByText} = render(
      <MemoryRouter>
        <Login authUser={null}/>
      </MemoryRouter>)

      //get email

      //get password

      //click the login button

      //expect email render on nav
  })
})