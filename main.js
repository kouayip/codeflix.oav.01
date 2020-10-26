const fs = require("fs");
const path = require("path");

const EXT_ENV = ".env";
const EXT_INI = ".ini";

const REGEX_ENV = /(.*)=(.*)/gm;

const parse = function (filename) {
  const ext = path.extname(filename);
  if (ext.toLowerCase() === EXT_ENV) {
    const contents = fs.readFileSync(filename).toString();
    parseENV(contents);
  } else if (ext.toLowerCase() === EXT_INI) {
    const contents = fs.readFileSync(filename).toString();
    parseINIT(contents);
  } else {
    console.error("Error extension file", ext);
  }
};

const parseINIT = function (fileContents) {};

const parseENV = function (fileContents) {
  const matcher = fileContents.match(REGEX_ENV);
  const parse = parserValues(matcher);
  const jsonString = JSON.stringify(parse);
  console.log(jsonString);
};

const parserValues = function (tab) {
  const objParse = {};
  for (const str of tab) {
    const sp = str.split("=");
    if (sp) {
      objParse[sp[0]] = sp[1];
    }
  }
  return objParse;
};

parse(process.argv[2]);
