const fs = require("fs");
const path = require("path");
const filename = process.argv[2];

const EXT_ENV = ".env";
const EXT_INI = ".ini";

const parse = function (filename) {
  const ext = path.extname(filename);
  if (ext.toLowerCase() === EXT_ENV) {
    parseENV();
  } else if (ext.toLowerCase() === EXT_INI) {
    parseINIT();
  }
};

const parseINIT = function () {};

const parseENV = function () {};

parse(process.argv[2]);
