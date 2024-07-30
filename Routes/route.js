import express from "express";
import { LoginHandler } from "../controllers/auth-controller/LoginHandler.js";
import { RegisterHandler } from "../controllers/auth-controller/RegisterHandle.js";
 const auth_routes = express.Router()

auth_routes.post("/auth/signin", LoginHandler)
auth_routes.post("/auth/signup", RegisterHandler)
export default auth_routes