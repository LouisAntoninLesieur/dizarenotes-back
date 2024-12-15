/**
 * Service for managing notes.
 * 
 * @param {Object} Note - The Note model.
 * @param {Object} Author - The Author model.
 * @param {Object} Comment - The Comment model.
 * @returns {Object} The note service with methods to get notes.
 */
export function getNotesService(Note, Author, Comment) {
  return {
    /**
     * Get all notes with their authors.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of notes.
     * @throws Will throw an error if the operation fails.
     */
    async getAllNotes() {
      try {
        const notes = await Note.findAll({
          include: {
            model: Comment,
            include: {
              model: Author,
              attributes: ["userName"],
            },
            attributes: ["content"],
          },
        });
        return notes;
      } catch (error) {
        throw new Error('Failed to get all notes');
      }
    },

    /**
     * Get a note by its ID with its author.
     * 
     * @param {number} id - The ID of the note to retrieve.
     * @returns {Promise<Object|null>} A promise that resolves to the note object or null if not found.
     * @throws Will throw an error if the operation fails.
     */
    async getNoteById(id) {
      try {
        const note = await Note.findByPk(id, {
          include: {
            model: Comment,
            include: {
              model: Author,
              attributes: ["userName"],
            },
            attributes: ["content"],
          },
        });
        return note;
      } catch (error) {
        throw new Error('Failed to get note by ID');
      }
    },

    /**
     * Get notes by author ID.
     * 
     * @param {number} authorId - The ID of the author whose notes to retrieve.
     * @returns {Promise<Array>} A promise that resolves to an array of notes.
     * @throws Will throw an error if the operation fails.
     */
    // async getNotesByAuthorId(authorId) {
    //   try {
    //     const notes = await Note.findAll({
    //       where: { authorId },
    //       include: {
    //         model: Author,
    //         attributes: ["userName"],
    //       },
    //     });
    //     return notes;
    //   } catch (error) {
    //     throw new Error('Failed to get notes by author ID');
    //   }
    // }
  };
}
