import express from "express";
import db from "./Config/mongoose.config.js";
import userRoute from "./src/Routes/user.route.js";
import authenticateToken from "./middleware/auth.middleware.js";
import { enqueueTask } from "./src/Controllers/user.controller.js";
import { configDotenv } from "dotenv";
import { errorLogger, requestLogger } from "./middleware/logger.middleware.js";
import { metricsEndpoint, metricsMiddleware } from "./middleware/metrics.middlware.js";

configDotenv();
const app = express();
const port = process.env.PORT || 4000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(metricsMiddleware);

app.use("/user", userRoute);
app.post("/task/:id", authenticateToken, enqueueTask);
app.get('/metrics',authenticateToken,metricsEndpoint);


app.use(errorLogger);

app.listen(port, (err) => {
  if (err) {
    console.error("❌ server failed to start on port", port);
  }
  console.log("✅ Server Started Successfully on Port", port);
});
