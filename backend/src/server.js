import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Hello from Server"));

app.use("/api/users", userRoutes);

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
