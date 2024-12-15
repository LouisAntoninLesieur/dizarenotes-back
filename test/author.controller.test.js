import { expect } from "chai";
import request from "supertest";
import { app } from "../index.js";
import { Author } from "../src/models/index.models.js";

describe("Author controller", () => {
  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });
});

describe("Author model", () => {
  it("should be defined", () => {
    expect(Author).to.be.ok;
  });
});

describe("Author controller", () => {
  it("should create an author, get all authors, and get an author by ID, login an author", async () => {
    const author = await Author.create({
      userName: "Achille",
      email: "achille@example.com",
      password: "password123",
    });
    it("should create an author", async () => {
      expect(author).to.have.property("id");
      expect(author.userName).to.equal("Achille");
      expect(author.email).to.equal("achille@example.com");
      expect(author.password).to.equal("password123");
    });
    it("should get all authors", async () => {
      const res = await request(app).get("/api/author");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
    it("should get an author by ID", async () => {
      const res = await request(app).get(`/api/author/${author.id}`);
      expect(res.status).to.equal(200);
      expect(res.bod.userNamey).to.equal("Achille");
      expect(res.body.email).to.equal("achille@example.com");
    })
    it("should login an author", async () => {
      const res = await request(app).post("/api/author/login").send({
        email: "achille@example.com",
        password: "password123",
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
    });
  });
});