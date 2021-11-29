import React from "react";
import Referral from "../components/Referral";

export default {
  title: 'Referral',
  component: Referral,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => <Referral {...args} />;

export const Referral_Example = Template.bind({});

const authUser = {referral_code: 'aB7s7s'}

Referral_Example.args = {
  authUser: authUser
}