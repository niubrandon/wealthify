import React from "react";

import Error from "../components/Error";

export default {
  title: 'Error',
  component: Error,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Template = (args) => <Error {...args} />;

export const Error_login = Template.bind({});

Error_login.args = {
  variant: "danger",
  errorMessage: "Wrong login"
}