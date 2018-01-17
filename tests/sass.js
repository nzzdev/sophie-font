#!/usr/bin/env node
const sass = require("node-sass");
const fs = require("fs");
const jsonImporter = require("node-sass-json-importer");

const files = fs.readdirSync("scss");
files.forEach(function(fileName) {
  try {
    sass.renderSync({
      file: "scss/" + fileName,
      includePaths: ["scss", "node_modules"],
      importer: jsonImporter
    });
  } catch (err) {
    console.error(`failed compiling ${fileName}`);
    console.error(err);
    process.exit(1);
  }
});
