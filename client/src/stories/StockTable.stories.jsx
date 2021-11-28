import React from "react";
import StockTable from "../components/StockTable";

export default {
  title: 'Stock Table Example',
  component: StockTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => <StockTable {...args} />;

export const StockTableExample = Template.bind({});

StockTableExample.args = {
  regularMarketPrice: 160.55,
  regularMarketChange: 2.680008,
  regularMarketChangePercent: 1.6976044,
  marketCap: 2634047553536,
  regularMarketDayHigh: 161.02,
  regularMarketDayLow: 156.5328,
  regularMarketVolume: 117305597,
  regularMarketPreviousClose: 157.87,
  exchange: "NASDAQ",
  regularMarketOpen: 157.65
}
