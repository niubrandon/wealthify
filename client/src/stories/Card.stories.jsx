import React from "react";

import Card from "../components/Card";

import { MemoryRouter } from "react-router";

export default {
  title: 'Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => <MemoryRouter><Card {...args} /></MemoryRouter>;

export const Card_Example = Template.bind({});

Card_Example.args = {
  name: "AAPL",
  symbol: "AAPL",
  exchDisp: "NASDAQ",
  regMP: 100,
  regMCP: 5,
  quoteType: null,
  authUser: null
}
