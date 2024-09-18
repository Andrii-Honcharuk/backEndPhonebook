import express from "express";

import bookRoutes from "./book.js";
import movieRoutes from "./movie.js";

const router = express.Router();

router.use("/books", bookRoutes);
router.use("/movies", movieRoutes);

export default router;
