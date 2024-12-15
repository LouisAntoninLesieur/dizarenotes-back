import * as noteController from "../controllers/noteController.js";
import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.use(isLoggedIn);
router.get('/', noteController.getAllNotesHandler);
router.get('/:noteId', noteController.getNoteByIdHandler);
// router.get('/author/:authorId', noteController.getNotesByAuthorHandler);

export default router;