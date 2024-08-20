const express = require("express");
const app = express();

app.use(express.json());

let products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

function getProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addNewProduct(product) {
  let newProduct = {
    id: products.length + 1,
    ...product,
  };

  products.push(newProduct);
  return newProduct;
}

app.get("/products", (req, res) => {
  res.status(200).json(getProducts());
});

app.get("/products/:id", (req, res) => {
  const product = getProductById(parseInt(req.params.id));

  if (!product) {
    return res.status(404).send("product Not Find");
  }
  res.json(product);
});

app.post("/products/new", (req, res) => {
  const product = addNewProduct(req.body);
  res.status(201).json(product);
});

module.exports = {
  app,
  getProducts,
  getProductById,
  addNewProduct,
};
