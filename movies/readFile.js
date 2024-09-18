const fs = require("node:fs/promises");
const path = require("node:path");

console.log("Start");

async function readFile() {
  const filePath = path.join(__dirname, "read.txt");
  console.log("filePath", filePath);
  const data = await fs.readFile(filePath, {
    encoding: "utf-8",
  });
  // .then((data) => {
  //   console.log(data);
  //   console.log("End");
  // })
  // .catch((err) => {
  //   throw err;
  // });
  return data;
}

// readFile();

module.exports = {
  readFile,
};
