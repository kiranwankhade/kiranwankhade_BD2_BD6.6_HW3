let {
  app,
  getProducts,
  getProductById,
  addNewProduct,
} = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => {
  const originalModule = jest.requireActual("../index.js");
  return {
    ...originalModule,
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    addNewProduct: jest.fn(),
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

  test("getProducts should return an list of products", () => {
    const mockProdcuts = [
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
    ];

    getProducts.mockReturnValue(mockProdcuts);

    let result = getProducts();

    expect(result).toEqual(mockProdcuts);

    expect(getProducts).toHaveBeenCalled();
  });

  test("getProductById should return a product by id", () => {
    const mockProduct = { id: 1, name: "Laptop", category: "Electronics" };

    getProductById.mockReturnValue(mockProduct);
    let result = getProductById(1);
    expect(result).toEqual(mockProduct);
    expect(getProductById).toHaveBeenCalledWith(1);
  });

  test("getPorductById should return undefined if product not found", () => {
    getProductById.mockReturnValue(undefined);

    let result = getProductById(999);

    expect(result).toBeUndefined();

    expect(getProductById).toHaveBeenCalledWith(999);
  });

  test("addProduct should add new product", () => {
    const newProduct = {
      id: 5,
      name: "New Product",
      category: "Electronics",
    };

    addNewProduct.mockReturnValue(newProduct);

    let result = addNewProduct(newProduct);
    expect(result).toEqual(newProduct);

    expect(addNewProduct).toHaveBeenCalledWith(newProduct);
  });
});
