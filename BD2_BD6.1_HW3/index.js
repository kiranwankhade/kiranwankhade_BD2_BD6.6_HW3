let { getProducts, getProductById, addNewProduct } = require("./product");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
