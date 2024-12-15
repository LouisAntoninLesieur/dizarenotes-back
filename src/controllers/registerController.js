import { getRegisterService } from "../services/registerService.js";
import { zValidationSchema } from "../utils/zValidationSchema.js";
import bcrypt from "bcrypt";
import { Author } from "../models/index.models.js";
import logger from "../utils/logger.js";

const registerService = getRegisterService(logger, Author);
const registerSchema = zValidationSchema;

export async function registerUserHandler(req, res) {
  const validationResult = registerSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error.errors });
  }
  const { userName, email, password } = validationResult.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { userName, email, password: hashedPassword };
  try {
    const author = await registerService.registerUser(userData);
    return res.status(201).json(author);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}