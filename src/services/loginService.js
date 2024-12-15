/**
 * Creates a login service.
 *
 * @param {Object} logger - The logger object for logging information.
 * @param {Object} Author - The Author model for querying the database.
 * @param {Object} bcrypt - The bcrypt library for password hashing.
 * @param {Object} jwt - The JSON Web Token library for token generation.
 * @returns {Object} The login service with a logIn method.
 */
export function getLogInService(logger, Author, bcrypt, jwt) {
  return {
    /**
     * Logs in a user by verifying their email and password.
     *
     * @async
     * @function logIn
     * @param {string} email - The email of the user trying to log in.
     * @param {string} password - The password of the user trying to log in.
     * @returns {Promise<Object>} A promise that resolves to an object containing the user and a JWT token.
     * @throws Will throw an error if the login fails.
     */
    async logIn(email, password) {
      try {
        logger.info('Someone is trying to log in...');
        const user = await Author.findOne({ where: { email } });
        if (!user) {
          logger.warn('User not found');
          throw new Error('Something went wrong');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          logger.warn('Invalid password');
          throw new Error('Something went wrong');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
      } catch (error) {
        logger.error(`Error logging in author: ${error.message}`);
        throw error;
      }
    },
  };
}