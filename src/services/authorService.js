/**
 * Creates an author service with methods to interact with the Author model.
 *
 * @param {Object} logger - The logger object for logging information and errors.
 * @param {Object} Author - The Author model to interact with the database.
 * @returns {Object} An object containing methods to interact with the Author model.
 */
export function getAuthorService(logger, Author) {
  return {
    /**
     * Retrieves all authors from the database.
     *
     * @async
     * @function getAllAuthorsService
     * @returns {Promise<Array>} A promise that resolves to an array of authors.
     * @throws Will throw an error if there is an issue retrieving authors.
     */
    async getAllAuthorsService() {
      try {
        logger.info('Retrieving authors...');
        const authors = await Author.findAll();
        return authors;
      } catch (error) {
        logger.error(`Error retrieving authors: ${error.message}`);
        throw error;
      }
    },

    /**
     * Retrieves an author by their ID from the database.
     *
     * @async
     * @function getAuthorByIdService
     * @param {number} id - The ID of the author to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the author object if found.
     * @throws Will throw an error if the ID is invalid or the author is not found.
     */
    async getAuthorByIdService(id) {
      try {
        logger.info('Retrieving author...');
        if (isNaN(id)) {
          logger.error('Invalid ID');
          throw new Error('Invalid ID');
        }
        const author = await Author.findByPk(id);
        if (author) {
          return author;
        } else {
          logger.warn('Author not found');
          throw new Error('Author not found');
        }
      } catch (error) {
        logger.error(`Error retrieving author: ${error.message}`);
        throw error;
      }
    }
  };
}

// When to use Service functions?
// When you want to abstract the logic of your application from the actual implementation details of your application.
// This way, you can change the implementation without affecting the logic of your application.
// You can use Service functions to interact with the database, external APIs, or other services.
// You can use Service functions to handle business logic, validation, and error handling.
// Service functions can help you keep your code clean, organized, and maintainable.
// This way, you can separate the concerns of your application and make it easier to test and maintain.