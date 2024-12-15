/**
 * Creates a user service with methods to interact with notes.
 *
 * @param {Object} logger - The logger object for logging information and errors.
 * @param {Object} Author - The Author model for querying the database.
 * @param {Object} Note - The Note model for creating and updating notes.
 * @returns {Object} The user service with methods to create, update, fetch, and delete notes.
 */
export function getUserService(logger, Author, Note) {
  return {
    /**
     * Creates a new note.
     *
     * @async
     * @function createNote
     * @param {number} authorId - The ID of the author creating the note.
     * @param {string} title - The title of the note.
     * @param {string} content - The content of the note.
     * @param {boolean} isOpen - The visibility status of the note.
     * @returns {Promise<Object>} A promise that resolves to the newly created note object.
     * @throws Will throw an error if the creation fails.
     */
    async createNote(authorId, title, content, isOpen) {
      try {
        logger.info('Someone is trying to create a note...');
        const author = await Author.findByPk(authorId);
        if (!author) {
          throw new Error("Author not found");
        }
        const newNote = await Note.create({ author_id: author.id, title, content, isOpen });
        logger.info(`Note created for author: "${author.userName}"`);
        return newNote;
      } catch (error) {
        logger.error(`Error creating note: ${error.message}`);
        throw error;
      }
    },

    /**
     * Updates an existing note.
     *
     * @async
     * @function updateNote
     * @param {number} noteId - The ID of the note to update.
     * @param {number} authorId - The ID of the author updating the note.
     * @param {string} [title] - The new title of the note.
     * @param {string} [content] - The new content of the note.
     * @param {boolean} [isOpen] - The new visibility status of the note.
     * @returns {Promise<Object>} A promise that resolves to the updated note object.
     * @throws Will throw an error if the update fails.
     */
    async updateNote(noteId, authorId, title, content, isOpen) {
      try {
        logger.info('Someone is trying to update a note...');
        const noteToBeUpdated = await Note.findByPk(noteId);
        if (!noteToBeUpdated) {
          throw new Error("Note not found");
        }
        if (noteToBeUpdated.author_id !== authorId) {
          throw new Error("Unauthorized");
        }
        noteToBeUpdated.title = title || noteToBeUpdated.title;
        noteToBeUpdated.content = content || noteToBeUpdated.content;
        noteToBeUpdated.isOpen = isOpen || noteToBeUpdated.isOpen;
        await noteToBeUpdated.save();
        logger.info(`Note updated: ${noteId}`);
        return noteToBeUpdated;
      } catch (error) {
        logger.error(`Error updating note: ${error.message}`);
        throw error;
      }
    },

    /**
     * Retrieves all notes for a specific author.
     *
     * @async
     * @function getAllUserNotes
     * @param {number} authorId - The ID of the author whose notes to retrieve.
     * @returns {Promise<Array>} A promise that resolves to an array of notes.
     * @throws Will throw an error if the retrieval fails.
     */
    async getAllUserNotes(authorId) {
      try {
        logger.info('Someone is trying to fetch all notes...');
        const notes = await Note.findAll({ where: { author_id: authorId } });
        logger.info(`Notes fetched for author: "${authorId}"`);
        return notes;
      } catch (error) {
        logger.error(`Error fetching notes: ${error.message}`);
        throw error;
      }
    },

    /**
     * Retrieves a note by its ID.
     *
     * @async
     * @function getUserNoteById
     * @param {number} noteId - The ID of the note to retrieve.
     * @returns {Promise<Object|null>} A promise that resolves to the note object or null if not found.
     * @throws Will throw an error if the retrieval fails.
     */
    async getUserNoteById(noteId) {
      try {
        const note = await Note.findByPk(noteId);
        return note;
      } catch (error) {
        logger.error(`Error fetching note: ${error.message}`);
        throw error;
      }
    },

    /**
     * Deletes a note by its ID.
     *
     * @async
     * @function deleteNote
     * @param {number} noteId - The ID of the note to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted note object.
     * @throws Will throw an error if the deletion fails.
     */
    async deleteNote(noteId) {
      try {
        logger.info('Someone is trying to delete a note...');
        const noteToBeDeleted = await Note.findByPk(noteId);
        if (!noteToBeDeleted) {
          throw new Error("Note not found");
        }
        await noteToBeDeleted.destroy();
        logger.info(`Note deleted: ${noteId}`);
        return noteToBeDeleted;
      } catch (error) {
        logger.error(`Error deleting note: ${error.message}`);
        throw error;
      }
    },

    async createAComment (noteId, authorId, content) {
      try {
        logger.info('Someone is trying to create a comment...');
        const note = await Note.findByPk(noteId);
        if (!note) {
          throw new Error("Note not found");
        }
        const newComment = await note.createComment({ author_id: authorId, content });
        logger.info(`Comment created for note: "${noteId}"`);
        return newComment;
      } catch (error) {
        logger.error(`Error creating comment: ${error.message}`);
        throw error;
      }
    }
  };
}