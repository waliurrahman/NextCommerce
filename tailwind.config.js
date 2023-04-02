const { join } = require('path');

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      "*"
    ],
    safelist: ['bg-red-500'], // Example of how to whitelist classes
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
