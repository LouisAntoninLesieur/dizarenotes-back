/**
 * Creates a register service.
 *
 * @param {Object} logger - The logger object for logging information and errors.
 * @param {Object} Author - The Author model for creating new authors.
 * @returns {Object} The register service with a method to register a user.
 */
export function getRegisterService(logger, Author) {
  return {
    /**
     * Registers a new user.
     *
     * @async
     * @function registerUser
     * @param {Object} userData - The data of the user to register.
     * @returns {Promise<Object>} A promise that resolves to the newly created author object.
     * @throws Will throw an error if the registration fails.
     */
    async registerUser(userData) {
      try {
        logger.info('Registering author...');
        const author = await Author.create(userData);
        logger.info(`\nNew user : "${userData.userName}"\nhas registered under email: "${userData.email}"`);
        return author;
      } catch (error) {
        logger.error(`Error registering author: ${error.message}`);
        throw error;
      }
    }
  };
}