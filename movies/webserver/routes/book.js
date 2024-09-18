import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("GET books");
});

router.post("/", (req, res) => {
  res.send("POST books");
});

export default router;
