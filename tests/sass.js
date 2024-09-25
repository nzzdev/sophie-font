#!/usr/bin/env node
const sass = require("sass");
const fs = require("fs");

const files = fs.readdirSync("scss");
files.forEach(function(fileName) {
  try {
    console.log(
      sass
        .compile("scss/" + fileName)
        .css.toString()
    );
  } catch (err) {
    console.error(`failed compiling ${fileName}`);
    console.error(err);
    process.exit(1);
  }
});
