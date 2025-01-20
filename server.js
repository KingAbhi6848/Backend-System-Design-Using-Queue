import express from "express";
import db from "./Config/mongoose.config.js";
import userRoute from "./src/Routes/user.route.js";
import authenticateToken from "./middleware/auth.middleware.js";
import { enqueueTask } from "./src/Controllers/user.controller.js";
import { configDotenv } from "dotenv";
configDotenv();
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.post("/task/:id", authenticateToken, enqueueTask);

app.listen(port, (err) => {
  if (err) {
    console.error("❌ server failed to start on port", port);
  }
  console.log("✅ Server Started Successfully on Port", port);
});
