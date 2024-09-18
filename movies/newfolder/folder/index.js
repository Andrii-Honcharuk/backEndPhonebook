import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const filePath = path.resolve("folder", "read.json");

async function readFiles() {
  const data = await fs.readFile(filePath, { encoding: "utf-8" });

  return JSON.parse(data);
}

function writeFile(file) {
  return fs.writeFile(filePath, JSON.stringify(file, 2));
}

async function getInfo() {
  const data = await readFiles();

  return data;
}

async function getSomeById(id) {
  const dataFile = await readFiles();
  const some = dataFile.find((some) => some.id === id);

  if (!some) {
    return null;
  }

  return some;
}

async function createInfo(dataIn) {
  const data = await readFiles();

  const newInfo = { ...dataIn, id: crypto.randomUUID() };
  data.push(newInfo);
  await writeFile(data);

  return newInfo;
}

async function updateSome(id, some) {
  console.log("Start updateSome", id, some);
  const data = await readFiles();

  const index = data.findIndex((info) => {
    console.log("info.id", info.id, id);
    return info.id === id;
  });
  console.log("index", index);
  if (index === -1) return null;

  const updatedOne = { ...some, id };
  console.log("updatedOne", updatedOne);

  data[index] = updatedOne;

  await writeFile(data);

  return updatedOne;
}

async function remove(id) {
  const data = await readFiles();

  const index = data.findIndex((info) => {
    console.log("info.id", info.id, id);
    return info.id === id;
  });

  console.log("index", index);

  if (index === -1) return null;

  const removeOne = data[index];

  data.splice(index, 1);
  await writeFile(data);
  return removeOne;
}

export default { getInfo, getSomeById, createInfo, updateSome, remove };
