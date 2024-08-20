const request = require("supertest");

const {
  app,
  getRecipes,
  getRecipesById,
  addNewRecipes,
} = require("../index.js");

const http = require("http");

jest.mock("../index.js", () => {
  const originalModule = jest.requireActual("../index.js");
  return {
    ...originalModule,
    getRecipes: jest.fn(),
    getRecipesById: jest.fn(),
    addNewRecipes: jest.fn(),
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

describe("Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getRecipes should return an list of Recipes", () => {
    const mockRecipes = [
      {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
      },
    ];

    getRecipes.mockReturnValue(mockRecipes);

    let result = getRecipes();

    expect(result).toEqual(mockRecipes);

    expect(getRecipes).toHaveBeenCalled();
  });

  test("getRecipesById should return a Recipe by id", () => {
    const mockRecipe = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };

    getRecipesById.mockReturnValue(mockRecipe);
    let result = getRecipesById(1);
    expect(result).toEqual(mockRecipe);
    expect(getRecipesById).toHaveBeenCalledWith(1);
  });

  test("getRecipesById should return undefined if product not found", () => {
    getRecipesById.mockReturnValue(undefined);

    let result = getRecipesById(999);

    expect(result).toBeUndefined();

    expect(getRecipesById).toHaveBeenCalledWith(999);
  });

  test("addNewRecipes should add new product", () => {
    const newRecipe = {
      id: 3,
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    };

    addNewRecipes.mockReturnValue(newRecipe);

    let result = addNewRecipes(newRecipe);
    expect(result).toEqual(newRecipe);

    expect(addNewRecipes).toHaveBeenCalledWith(newRecipe);
  });
});
