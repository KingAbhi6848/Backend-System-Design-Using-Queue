import express from "express";
import { login, signup } from "../Controllers/user.controller.js";
import authenticateToken from "../../middleware/auth.middleware.js";
const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);


export default userRoute;
