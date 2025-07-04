import express from "express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.get("/", (req, res) => res.send("Hello from Server"));

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log(`Server in port: ${ENV.PORT}`));
  } catch (error) {
    console.error("Failed to Start Server: ", error.message);
    process.exit(1);
  }
};

startServer();
