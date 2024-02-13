// api/Routes/authentication.js

import express from "express";
import { login, signup } from "../Controllers/authentication.js";

const router = express.Router();

// router.post("/Registration", Registration)
// router.post("/Login", Login)


router.post("/signup", signup)
router.post("/login", login)

export default router