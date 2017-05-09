#!/usr/bin/env node
var sass = require('node-sass');
var fs = require('fs');

sass.render(
  {
    file: 'main.scss',
    includePaths: ['scss', 'node_modules']
  },
  function(error, result) {

    if (error){
      return console.log('error rendering', error);
    }

    // No errors during the compilation, write this result on the disk
    fs.writeFile(__dirname + '/main.css', result.css, function(err){
      if(err){
        return console.log('error file', error);
      }
      console.log('file written to ./main.css');

    });
  }
);
