import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, prettyDOM, queryByText, queryByAltText } from "@testing-library/react";


import Login from '../Login.jsx'
import { MemoryRouter } from "react-router";


afterEach(cleanup);

describe("Login", () => {
 
  it("render without crashing", async() => {
  //const onSubmit = jest.fn();
   const { getByText, getByPlaceholderText} = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>)

      //get email
      const email = getByPlaceholderText("Enter email")
      fireEvent.change(email, {target: {value: "niubrandon@gmail.com"}})
      //get password
      const password = getByPlaceholderText("Password")
      fireEvent.change(password, {target: {value: "Super12345"}})
      //click the login button
      fireEvent.click(getByText("Login"))
      //expect email render on nav
      //await waitForElement(() => getByText("Logout"))
      //expect(getByText("Logout")).toBeInTheDocument();
      //expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})