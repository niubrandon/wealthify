import React from "react";
import userEvent from '@testing-library/user-event';
import { render, act, screen, cleanup, prettyDOM, waitFor} from "@testing-library/react";
import Login from '../Login.jsx'
import { MemoryRouter } from "react-router";
import { rest } from 'msw';
import { setupServer } from 'msw/node'


const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json(ctx.status(201)))
  }),
)
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())


afterEach(cleanup);
jest.mock('axios');
describe("Login", () => {
 
  it("login user", async() => {


    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>)
      console.log("printing initial",prettyDOM())
      const form = screen.getByTestId("signin-form").querySelectorAll("input")[0];
      const form1 = screen.getByTestId("signin-form").querySelectorAll("input")[1];
      const button = screen.getByTestId("signin-form").querySelector("button")
      
      //console.log("printing",prettyDOM(form))
      //const email = form.querySelector("input")
      
      userEvent.type(form, "niubrandon@gmail.com")
      
      
      //fireEvent.change(email, {target: {value: "niubrandon@gmail.com"}})
      //get password
  
      userEvent.type(form1, "Super12345")
      console.log("printing",prettyDOM(form))
      console.log("printing",prettyDOM(form1))
      console.log("printing",prettyDOM(button))
 
      userEvent.click(button)
      await waitFor(() => screen.getByTestId("nav-bar"))
      await waitFor(() => screen.getByTestId("nav-bar-welcome"))

      expect(screen.getByText("Welcome")).toBeInTheDocument();
     
      
     
  })
})