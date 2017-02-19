#!/usr/bin/env node
var sass = require('node-sass');

sass.renderSync({
  file: 'main.scss',
  includePaths: ['scss', 'node_modules']
});
