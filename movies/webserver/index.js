import * as fs from "node:fs/promises";
import express from "express";
import path from "node:path";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

const PORT = 8080;

// app.use(apiCheck);
app.use("/api", routes);

app.use(cors());

app.use((req, res, next) => {
  console.log("--------Middleware B---------");
  //   console.log("req\n--------------------------\n", req);
  //   console.log("res", res);
  //   console.log("next", next);
  next();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

function apiCheck(req, res, next) {
  console.log("--------Middleware A---------");
  // console.log(req.query);

  const apiKey = req.query["api-key"];

  if (apiKey !== "12345") {
    console.log("Wrong", apiKey);
    return res.status(401).send("Wrong ApiKey");
  }

  next();
}
