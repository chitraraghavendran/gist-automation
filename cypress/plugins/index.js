/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable filename-rules/match */
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  const options = {
    typescript: require.resolve('typescript'),
  };

  on('file:preprocessor', cucumber(options));
  return config;
};