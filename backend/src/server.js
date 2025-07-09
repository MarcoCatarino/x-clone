import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";

const app = express();

// TODO: Middleware
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use(arcjetMiddleware); // We don't initialize '()' because it's going to be called by express when we run the Server by default

app.get("/", (req, res) => res.send("Hello from Server 2.0")); // Prueba

// TODO: Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// TODO: Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// TODO: Start Server
const startServer = async () => {
  try {
    await connectDB();

    //* Listen the port just in local development
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => console.log(`Server in port: ${ENV.PORT}`));
    }
  } catch (error) {
    console.error("Failed to Start Server: ", error.message);
    process.exit(1);
  }
};

startServer();

// TODO: Export for Vercel Deploying
export default app;
