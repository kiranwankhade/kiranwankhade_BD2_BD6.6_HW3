const request = require("supertest");

const { app, validateArticle, validateAuthor } = require("../index.js");

const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API error Testing", () => {
  it("should add a new article with valid input", async () => {
    const res = await request(server).post("/articles").send({
      title: "Understanding JavaScript",
      content:
        "JavaScript is a versatile language used for both frontend and backend development.",
    });

    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "Understanding JavaScript",
      content:
        "JavaScript is a versatile language used for both frontend and backend development.",
    });
  });

  it("should return 404 Article with Invalid Input", async () => {
    const res = await request(server).post("/articles").send({
      title: "Understanding JavaScript",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Content is required and should be a string.");
  });

  it("should return 404 Article with Invalid Input", async () => {
    const res = await request(server).post("/articles").send({
      content:
        "JavaScript is a versatile language used for both frontend and backend development.",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Title is required and should be a string.");
  });

  it("should add a new author with valid input", async () => {
    const res = await request(server).post("/authors").send({
      name: "John Doe",
      articleId: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      articleId: 1,
    });
  });

  it("should return 404 Author with Invalid Input", async () => {
    const res = await request(server).post("/authors").send({
      name: "John Doe",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("articleId is required and should be a Number.");
  });
});

describe("Validation Function Tests", () => {
  it("should validate article input correctly", () => {
    expect(
      validateArticle({
        title: "Understanding JavaScript",
        content:
          "JavaScript is a versatile language used for both frontend and backend development.",
      }),
    ).toBeNull();

    expect(
      validateArticle({
        title: "Understanding JavaScript",
      }),
    ).toEqual("Content is required and should be a string.");

    expect(
      validateArticle({
        content:
          "JavaScript is a versatile language used for both frontend and backend development.",
      }),
    ).toEqual("Title is required and should be a string.");
  });

  it("should validate authors input correctly", () => {
    expect(
      validateAuthor({
        name: "John Doe",
        articleId: 1,
      }),
    ).toBeNull();

    expect(
      validateAuthor({
        name: "John Doe",
      }),
    ).toEqual("articleId is required and should be a Number.");

    expect(
      validateAuthor({
        articleId: 1,
      }),
    ).toEqual("Name is required and should be a string.");
  });
});
