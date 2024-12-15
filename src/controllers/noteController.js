import { Author, Note, Comment } from "../models/index.models.js";
import { getNotesService } from "../services/noteService.js";

const noteService = getNotesService(Note, Author, Comment);

// Récupérer toutes les notes
export async function getAllNotesHandler (req, res) {
  try {
    const notes = await noteService.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une note par ID
export async function getNoteByIdHandler (req, res) {
  try {
    const noteId = Number(req.params.noteId);
    const note = await noteService.getNoteById(noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les notes d'un auteur
// export async function getNotesByAuthorHandler (req, res) {
//   try {
//     const { authorId } = req.params;
//     const notes = await noteService.getNotesByAuthor(authorId);
//     if (!notes.length) {
//       return res.status(404).json({ error: "No notes found for this author" });
//     }
//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };