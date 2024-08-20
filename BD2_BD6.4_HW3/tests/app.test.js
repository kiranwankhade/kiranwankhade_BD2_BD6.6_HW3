const request = require("supertest");

const { app } = require("../index.js");

let {
  getArticles,
  getArticlesById,
  getComments,
  getCommentsById,
  getUserById,
} = require("../functions");

const http = require("http");

jest.mock("../functions.js", () => {
  const originalModule = jest.requireActual("../functions.js");
  return {
    ...originalModule,
    getArticles: jest.fn(),
    getArticlesById: jest.fn(),
    getComments: jest.fn(),
    getCommentsById: jest.fn(),
    getUserById: jest.fn(),
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API error Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /articles should return 404 if no articles found", async () => {
    getArticles.mockReturnValue([]);

    const response = await request(server).get("/articles");
    expect(response.status).toEqual(404);

    expect(response.body.error).toBe("No articles found");
  });

  it("GET /articles/:id should return 404 if no article found", async () => {
    getArticlesById.mockReturnValue(null);

    const response = await request(server).get("/articles/:id");
    expect(response.status).toEqual(404);

    expect(response.body.error).toBe("Article not found");
  });

  it("GET /comments should return 404 if no comments found", async () => {
    getComments.mockReturnValue([]);

    const response = await request(server).get("/comments");
    expect(response.status).toEqual(404);

    expect(response.body.error).toBe("No comments found");
  });

  it("GET /comments/:id should return 404 if no comment found", async () => {
    getCommentsById.mockReturnValue(null);

    const response = await request(server).get("/comments/:id");
    expect(response.status).toEqual(404);

    expect(response.body.error).toBe("Comment not found");
  });

  it("GET /users/:id should return 404 if no user found", async () => {
    getUserById.mockReturnValue(null);

    const response = await request(server).get("/users/:id");
    expect(response.status).toEqual(404);

    expect(response.body.error).toBe("User not found");
  });
});
