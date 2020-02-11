#!/usr/bin/env node
const sass = require("sass");
const fs = require("fs");
const jsonImporter = require("node-sass-json-importer");

const files = fs.readdirSync("scss");
files.forEach(function(fileName) {
  try {
    console.log(
      sass
        .renderSync({
          file: "scss/" + fileName,
          includePaths: ["scss", "node_modules"],
          importer: jsonImporter
        })
        .css.toString()
    );
  } catch (err) {
    console.error(`failed compiling ${fileName}`);
    console.error(err);
    process.exit(1);
  }
});
