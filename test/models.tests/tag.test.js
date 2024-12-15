import { expect } from "chai";
import { Tag } from "../../src/models/tag.model.js";
import { Note } from "../../src/models/note.model.js";
import { Author } from "../../src/models/author.model.js";
import { NoteTag } from "../../src/models/note-tag.model.js";

describe("Tag model", () => {
  it("should be defined", () => {
    expect(Tag).to.be.ok;
  });
});

describe("Tag must be associated with notes", () => {
  it("should be associated with notes", async () => {
    try {
      // Create a new tag
      const tag = await Tag.create({
        name: "Tag 1",
      });

      // Create a new author
      const author = await Author.create({
        userName: "Pilou",
        email: "pilou@example.com",
        password: "password123",
      });

      // Create a new note
      const note = await Note.create({
        author_id: author.id,
        title: "My first note",
        content: "This is my first note",
        isOpen: true,
      });

      // Create a new note-tag association
      await NoteTag.create({
        note_id: note.id,
        tag_id: tag.id
      });

      // Check if the tag is associated with the note
      const noteTags = await NoteTag.findAll({
        where: {
          note_id: note.id,
        },
      });
      expect(noteTags.length).to.equal(1);
      expect(noteTags[0].tag_id).to.equal(tag.id);
    } catch (error) {
      console.error(error);
    }
  });
});