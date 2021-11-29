import React from "react";
import LeaderboardDonutChart from "../components/LeaderboardDonutChart";

export default {
  title: 'LeaderboardDonut',
  component: LeaderboardDonutChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => <LeaderboardDonutChart {...args} />;

export const LeaderboardDonut = Template.bind({});

LeaderboardDonut.args = {
  stock_list: ['AAPL', 'EX2', 'EX3'],
  market_value: [50, 100, 200]
}
