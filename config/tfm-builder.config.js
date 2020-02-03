const path = require('path');

module.exports = {
  plugin: 'foreman-tasks',
  entry: {
    'foreman-tasks': require.resolve('../webpack/index.js'),
  },
  output: path.resolve(__dirname, '../public/webpack'),
  alias: {
    foremanReact: path.resolve(
      __dirname,
      '../../foreman/webpack/assets/javascripts/react_app'
    ),
  },
};
