import { expect } from "chai";
import { Note } from "../../src/models/note.model.js";
import { Author } from "../../src/models/author.model.js";
import { Comment } from "../../src/models/comment.model.js";

describe("Comment model", () => {
  it("should be defined", () => {
    expect(Comment).to.be.ok;
  });
});

describe("Comment creation test", () => {
  it("should create a comment", async () => {
    try {
      // Create a new author
      const author = await Author.create({
        userName: "Jim",
        email: "jim@example.com",
        password: "password123",
      });

      // Create a new note
      const note = await Note.create({
        author_id: author.id,
        title: "My first note",
        content: "This is my first note",
        isOpen: true,
      });

      // Create a new comment
      const comment = await Comment.create({
        author_id: author.id,
        note_id: note.id,
        content: "This is my first comment",
      });

      // Check if the comment was created successfully
      expect(comment).to.have.property("id");
      expect(comment.author_id).to.equal(author.id);
      expect(comment.note_id).to.equal(note.id);
      expect(comment.content).to.equal("This is my first comment");
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});

describe("Comment association test", () => {
  it("should associate a comment with a note and an author", async () => {
    try {
      // Create a new author
      const author = await Author.create({
        userName: "John",
        email: "john@example.com",
        password: "password123",
      });

      // Create an author who will create the note
      const noteAuthor = await Author.create({
        userName: "Jane",
        email: "jane@example.com",
        password: "password123",
      });

      // Create a new note
      const note = await Note.create({
        author_id: noteAuthor.id,
        title: "My first note",
        content: "This is my first note",
        isOpen: true,
      });

      // Create a new comment
      const comment = await Comment.create({
        author_id: author.id,
        note_id: note.id,
        content: "This is my first comment",
      });

      // Check if the comment was created successfully
      expect(comment).to.have.property("id");
      expect(comment.author_id).to.equal(author.id);
      expect(comment.note_id).to.equal(note.id);
      expect(comment.content).to.equal("This is my first comment");
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});

describe("Comment deletion test", () => {
  it("should delete a comment", async () => {
    try {
      // Create a new author
      const author = await Author.create({
        userName: "Barbara",
        email: "barbara@example.com",
        password: "password123",
      });

      // Create an author who will create the note
      const noteAuthor = await Author.create({
        userName: "Phoebe",
        email: "phoebe@example.com",
        password: "password123",
      });

      // Create a new note
      const note = await Note.create({
        author_id: noteAuthor.id,
        title: "My first note",
        content: "This is my first note",
        isOpen: true,
      });

      // Create a new comment
      const comment = await Comment.create({
        author_id: author.id,
        note_id: note.id,
        content: "This is my first comment",
      });

      // Check if the comment was created successfully
      expect(comment).to.have.property("id");
      expect(comment.author_id).to.equal(author.id);
      expect(comment.note_id).to.equal(note.id);
      expect(comment.content).to.equal("This is my first comment");

      // Delete the comment
      await Comment.destroy({
        where: {
          id: comment.id,
        },
      });

      // Check if the comment was deleted successfully
      const deletedComment = await Comment.findByPk(comment.id);
      expect(deletedComment).to.be.null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});