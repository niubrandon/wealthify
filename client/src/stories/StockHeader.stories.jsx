import React from "react";
import StockHeader from "../components/StockHeader";

export default {
  title: 'StockHeader',
  component: StockHeader,
};

const Template = (args) => <StockHeader {...args} />;

export const StockHeaderExample = Template.bind({});
StockHeaderExample.args = {
  name: "AAPL",
  regMP: 100
}

