import { Author, Note, Comment, Tag, sequelize } from "./association.js";
import logger from '../utils/logger.js';

try {
  // Record a log message when the models are successfully imported
  logger.info('Models imported successfully');
} catch (error) {
  // Record an error message when the models fail to import
  logger.error(`Error importing models: ${error.message}`);
}

export { Author, Note, Comment, Tag, sequelize };