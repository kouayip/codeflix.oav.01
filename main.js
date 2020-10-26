const fs = require("fs");
const path = require("path");

const EXT_ENV = ".env";
const EXT_INI = ".ini";

const REGEX_ENV = /(.*)=(.*)/gm;

const parse = function (filename) {
  const ext = path.extname(filename);
  if (ext.toLowerCase() === EXT_ENV) {
    const contents = fs.readFileSync(filename).toString();
    parseENV(filename, ext);
  } else if (ext.toLowerCase() === EXT_INI) {
    parseINIT(filename, ext);
  } else {
    console.error("Error extension file", ext);
  }
};

const parseINIT = function (fileName, ext) {};

const parseENV = function (filename, ext) {
  const fileShotName = filename.replace(ext, "");
  const contents = fs.readFileSync(filename).toString();
  const matcher = contents.match(REGEX_ENV);
  const parse = parserValues(matcher);
  const jsonString = JSON.stringify(parse);
  const filenameGenerate = fileGenerator(fileShotName);
  createFile(filenameGenerate, jsonString);
};

// Transform array to object values
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

// Generate new filename
const fileGenerator = function (fileShotName) {
  const dateYear = new Date().getFullYear();
  const timestamp = Date.now();
  const token = `${dateYear}${timestamp}`;
  const filename = `${fileShotName}.${token}.json`;
  return filename;
};

// Create new filename
const createFile = function (filename, contents) {
  fs.appendFile(filename, contents, function (err) {
    if (err) return console.error(err);
    console.log("`", filename, "`", "has been successfully created");
  });
};

parse(process.argv[2]);
