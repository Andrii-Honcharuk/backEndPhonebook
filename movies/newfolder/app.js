import { program } from "commander";

import Info from "./folder/index.js";

async function invokeAction({ action, id, title, text }) {
  switch (action) {
    case "getAll":
      const info = await Info.getInfo();
      return info;
    case "getById":
      const oneInfo = await Info.getSomeById(id);
      return oneInfo;
    case "create":
      const createOne = await Info.createInfo({ title, text });
      return createOne;
    case "update":
      const updateOne = await Info.updateSome(id, { title, text });
      return updateOne;
    case "remove":
      const removeOne = await Info.remove(id);
      return removeOne;

    default:
      return "unknown action :(";
  }
}

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Info Id")
  .option("-t, --title <title>", "Title info")
  .option("-tx, --text <text>", "Text");

program.parse(process.argv);

invokeAction(program.opts()).then(console.log).catch(console.error);
