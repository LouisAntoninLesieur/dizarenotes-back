import * as authorController from '../controllers/authorController.js';
import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';


const router = express.Router();

// router.use(isLoggedIn);
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);

export default router;

// When to use a router file ?
// You can use a router file to group routes together and make them easier to manage.
// This way, you can separate the concerns of your application and make it easier to test and maintain.