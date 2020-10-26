const fs = require("fs");
const path = require("path");
const filename = process.argv[2];

const EXT_ENV = ".env";
const EXT_INI = ".ini";

const parse = function (filename) {
  const ext = path.extname(filename);
  if (ext.toLowerCase() === EXT_ENV) {
    parseENV(filename);
  } else if (ext.toLowerCase() === EXT_INI) {
    parseINIT(filename);
  } else {
    console.error("Error extension file", ext);
  }
};

const parseINIT = function (filename) {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log(data);
  });
};

const parseENV = function (filename) {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log(data);
  });
};

parse(process.argv[2]);
