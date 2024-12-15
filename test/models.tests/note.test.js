import { expect } from "chai";
import { Note } from "../../src/models/note.model.js";
import { Author } from "../../src/models/author.model.js";

describe("Note model", () => {
    it("should be defined", () => {
        expect(Note).to.be.ok;
    });
});

describe('Note creation test', () => {
  it('should create a note', async () => {
    try {
      // Create a new author
      const author = await Author.create({
        userName: 'Stevens',
        email: 'stevens@example.com',
        password: 'password123'
      });
  
      // Create a new note
      const note = await Note.create({
        author_id: author.id,
        title: 'My first note',
        content: 'This is my first note',
        isOpen: true
      });
  
      // Check if the note was created successfully
      expect(note).to.have.property('id');
      expect(note.author_id).to.equal(author.id);
      expect(note.title).to.equal('My first note');
      expect(note.content).to.equal('This is my first note');
      expect(note.isOpen).to.equal(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});

describe('Note deletion test', () => {
  it('should delete a note', async () => {
    try {
      // Create a new author
      const author = await Author.create({
        userName: 'Burger',
        email: 'burger@example.com',
        password: 'password123'
      });
  
      // Create a new note
      const note = await Note.create({
        author_id: author.id,
        title: 'My first note',
        content: 'This is my first note',
        isOpen: true
      });
  
      // Check if the note was created successfully
      expect(note).to.have.property('id');
      expect(note.author_id).to.equal(author.id);
      expect(note.title).to.equal('My first note');
      expect(note.content).to.equal('This is my first note');
      expect(note.isOpen).to.equal(true);
  
      // Delete the note
      await Note.destroy({
        where: {
          id: note.id
        }
      });
  
      // Check if the note was deleted successfully
      const deletedNote = await Note.findByPk(note.id);
      expect(deletedNote).to.be.null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});