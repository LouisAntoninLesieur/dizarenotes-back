import { getLogInService } from '../services/loginService.js';
import logger from '../utils/logger.js';
import { Author } from '../models/author.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const logInService = getLogInService(logger, Author, bcrypt, jwt);

export async function loginHandler(req, res) {
  const { email, password } = req.body;

  try {
    const { user, token } = await logInService.logIn(email, password);
    logger.info(`"${user.userName}" logged in successfully`);
    return res.status(200).json({ token });
  } catch (error) {
    logger.error(`Error logging in: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }

}