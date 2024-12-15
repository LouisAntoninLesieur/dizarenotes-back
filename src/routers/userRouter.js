import * as userController from '../controllers/userController.js';
import express from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const router = express.Router();

router.use(isLoggedIn);
router.post('/note', userController.userCreateNote);
router.patch('/note/:noteId', userController.userUpdatesNote);
router.delete('/note/:noteId', userController.userDeletesNote);
router.get('/note/:noteId', userController.userGetNoteById);
router.get('/note', userController.userGetAllNotes);
router.post('/note/:noteId/comment', userController.userCreateComment);

export default router;