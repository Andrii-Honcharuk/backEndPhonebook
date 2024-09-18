import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  //   const data = await fs.readFile(path.resolve("movies.txt"), "utf-8");
  //   console.log(data);
  //   res.send(data);
  res.send("GET Movies ");
});

router.post("/", (req, res) => {
  res.send("POST movies");
});

export default router;
