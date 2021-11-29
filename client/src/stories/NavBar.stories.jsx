import React from "react";
import NavBar from "../components/NavBar";
import { MemoryRouter } from "react-router";

export default {
  title: 'NavBar',
  component: NavBar,
};

const Template = (args) => <MemoryRouter><NavBar {...args} /></MemoryRouter>;

export const LoggedOut = Template.bind({});
