import React from "react";

import { render, cleanup } from "@testing-library/react";

import { fireEvent } from "@testing-library/react";

import Signup from '../Signup.jsx'
import { MemoryRouter } from "react-router";


afterEach(cleanup);

describe("Login", () => {
 
  it("render without crashing", () => {
   const { getByText, getByPlaceholderText, queryByText} = render(
      <MemoryRouter>
        <Signup authUser={null}/>
      </MemoryRouter>)

      //get first_name

      //get last_name


      //get email

      //get password

      //get referral_link

      //click the login button

      //expect email render on nav
  })
})