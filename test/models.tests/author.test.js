import { expect } from "chai";
import { Author } from "../../src/models/author.model.js";

describe("Author model", () => {
  it("should be defined", () => {
    expect(Author).to.be.ok;
  });
});

describe('Author CRUD operations', () => {
  let author;

  const createAuthor = async (userName, email, password) => {
    return await Author.create({ userName, email, password });
  };

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  it('should create an author', async () => {
    author = await createAuthor('Louis', 'louis@example.com', 'password123');
    expect(author).to.have.property('id');
    expect(author.userName).to.equal('Louis');
    expect(author.email).to.equal('louis@example.com');
    expect(author.password).to.equal('password123');
  });

  it('should delete an author', async () => {
    author = await createAuthor('Marc', 'marc@example.com', 'password123');
    await Author.destroy({ where: { id: author.id } });
    const deletedAuthor = await Author.findByPk(author.id);
    expect(deletedAuthor).to.be.null;
  });

  it('should update an author', async () => {
    author = await createAuthor('Alex', 'alex@example.com', 'password123');
    author.userName = 'Adri';
    await author.save();
    const updatedAuthor = await Author.findByPk(author.id);
    expect(updatedAuthor.userName).to.equal('Adri');
  });
});

// When to use a test file ?
// You can use a test file to test your application and its components.
// This test file tests the Author model and the CRUD operations for the Author model.