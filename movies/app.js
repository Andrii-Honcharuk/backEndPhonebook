const readText = require("./readFile.js");

readText
  .readFile()
  .then((data) => console.log("There", data))
  .catch((err) => console.error(err));
