import { getUserService } from "../services/userService.js";
import { Author, Note, Comment } from "../models/index.models.js";
import logger from "../utils/logger.js";

const userService = getUserService(logger, Author, Note, Comment);

export async function userCreateNote (req, res) {
  try {
    const { title, content, isOpen } = req.body;
    const authorId = req.userId;
    const note = await userService.createNote(authorId, title, content, isOpen);
    res.status(201).json(note);
  } catch (error) {
    if (error.message === "Author not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export async function userUpdatesNote(req, res) {
  try {
    const { noteId } = req.params;
    const { title, content, isOpen } = req.body;
    const authorId = req.userId;
    const note = await userService.updateNote(noteId, authorId, title, content, isOpen);
    res.status(200).json(note);
  } catch (error) {
    if (error.message === "Note not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export async function userDeletesNote(req, res) {
  try {
    const { noteId } = req.params;
    const authorId = req.userId;
    await userService.deleteNote(noteId, authorId);
    res.sendStatus(204);
  } catch (error) {
    if (error.message === "Note not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export async function userGetAllNotes(req, res) {
  try {
    const authorId = req.userId;
    const notes = await userService.getAllUserNotes(authorId);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function userGetNoteById(req, res) {
  try {
    const { noteId } = req.params;
    const authorId = req.userId;
    const note = await userService.getUserNoteById(noteId);
    if (note.author_id !== authorId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.status(200).json(note);
  } catch (error) {
    if (error.message === "Note not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export async function userCreateComment(req, res) {
  try {
    const { noteId } = req.params;
    const { content } = req.body;
    const authorId = req.userId;
    const comment = await userService.createAComment(noteId, authorId, content);
    res.status(201).json(comment);
  } catch (error) {
    if (error.message === "Note not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};