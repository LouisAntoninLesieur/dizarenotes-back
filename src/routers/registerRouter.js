import { registerUserHandler } from '../controllers/registerController.js';
import express from 'express';

const router = express.Router();

router.post('/register', registerUserHandler);

export default router;