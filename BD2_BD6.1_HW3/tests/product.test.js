
let { getProducts, getProductById, addNewProduct } = require("../product");

describe("Products Functions", () => {
  it("Should get all Products", () => {
    let products = getProducts();
    expect(products.length).toBe(4);
    expect(products).toEqual([
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
      { id: 3, name: "Headphones", category: "Electronics" },
      { id: 4, name: "Running Shoes", category: "Footwear" },
    ]);
  });

  it("Should get a Product by ID", () => {
    let product = getProductById(1);

    expect(product).toEqual({ id: 1, name: "Laptop", category: "Electronics" });
  });

  it("should return undefined for a non-existant product", () => {
    let product = getProductById(99);
    expect(product).toBeUndefined();
  });

  it("Should add a new product", () => {
    let newProduct = {
      title: "New Product",
      category: "Electronics",
    };

    let addProduct = addNewProduct(newProduct);

    expect(addProduct).toEqual({
      id: 5,
      title: "New Product",
      category: "Electronics",
    });

    const products = getProducts();

    expect(products.length).toBe(5);
  });
});
