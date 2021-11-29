import React from "react";
import StockGraph from "../components/StockGraph";

export default {
  title: 'StockGraph',
  component: StockGraph,
};

const Template = (args) => <StockGraph {...args} />;

export const StockGraphAAPL = Template.bind({});
StockGraphAAPL.args = {
  xAxis: [1636986600, 1637073000, 1637159400, 1637245800, 1637338247],
  yAxis: [150, 151, 153.49000549316406, 157.8699951171875, 159.6199951171875],
  range: '5d'
}
