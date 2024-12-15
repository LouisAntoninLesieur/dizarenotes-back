import { getAuthorService } from '../services/authorService.js';
import logger from '../utils/logger.js';
import { Author } from '../models/index.models.js';

const authorService = getAuthorService(logger, Author);

export async function getAllAuthors(req, res) {
  try {
    const authors = await authorService.getAllAuthorsService();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAuthorById(req, res) {
  try {
    const id = Number(req.params.id);
    const author = await authorService.getAuthorByIdService(id);
    res.status(200).json(author);
  } catch (error) {
    if (error.message === 'Invalid ID') {
      res.status(400).json({ error: error.message });
    } else if (error.message === 'Author not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

// When to use a controller file ?
// You can use a controller file to group the logic of your application and make it easier to test and maintain.
// Note that we are not interacting with the database or external APIs in the controller file.
// The controller file is responsible for handling the request and response objects.
// It calls the service functions to retrieve data from the database or external APIs.
// This way, you can separate the concerns of your application and make it easier to test and maintain.