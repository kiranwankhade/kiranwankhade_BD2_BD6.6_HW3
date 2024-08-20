const request = require("supertest");

const { app } = require("../index.js");

const { getAllBooks, getBooksById } = require("../controllers/index.js");

const http = require("http");

jest.mock("../controllers/index.js", () => {
  const originalModule = jest.requireActual("../controllers/index.js");
  return {
    ...originalModule,
    getAllBooks: jest.fn(),
    getBooksById: jest.fn(),
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

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an list of books", () => {
    const mockBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockBooks);

    let result = getAllBooks();

    expect(result).toEqual(mockBooks);

    expect(result.length).toBe(3);
  });

  // it("should return a book by id", () => {
  //   const mockBook = {
  //     bookId: 1,
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     genre: "Fiction",
  //   };

  //   getBooksById.mockReturnValue(mockBook);
  //   let result = getBooksById(1);
  //   expect(result).toEqual(mockBook);
  //   expect(getBooksById).toHaveBeenCalledWith(1);
  // });
});

describe("APT Endpoints Test", () => {
  it("GET /books should return a list of books", async () => {
    const res = await request(server).get("/books");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: [
        {
          bookId: 1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
        },
        {
          bookId: 2,
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
        },
        {
          bookId: 3,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
        },
      ],
    });

    expec(res.body.books.length).toBe(3);
  });

  it("GET /books/details/:id should return a id book", async () => {
    const res = await request(server).get("/books/details/:id");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
    });
  });
});
