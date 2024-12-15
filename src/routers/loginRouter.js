import { loginHandler } from "../controllers/loginController.js";
import express from "express";

const router = express.Router();

router.post('/login', loginHandler);

export default router;