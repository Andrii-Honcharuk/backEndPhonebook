import app from "./app.js";
import { connectToDatabase } from "./db/connectDb.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
}
startServer();
