// Archico app.js 
import express from "express";
import ProductManager from "./ProductManager.js";
const PORT = 8080;
const app = express();
const productManager = new ProductManager("products.txt");
app.get('/bienvenida', (req, res) => {
  res.send(`<h1 style="color: blue;">Bienvenido a mi primer servidor!</h1>`);
});
app.get('/usuario', (req, res) => {
  res.json({
    nombre: "daniel",
    apellido: "Ramos",
    edad: 19,
    correo: "oscardanielramosvillalobos@gmail.com"
  });
});
// -----------------------
app.get('/products', (req, res) => { 
    const limit = req.query.limit; // Obtener el parámetro "limit" de la URL 
    const allProducts = productManager.getAllProducts(); 
    let limitedProducts = allProducts; 
    if (limit) { 
      limitedProducts = allProducts.slice(0, limit); // Limitar la cantidad de productos según el parámetro "limit" 
    } 
    res.json(limitedProducts); 
  });
// -----------------
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id); // Obtener el parámetro de la URL ":id" y convertirlo a entero
  const product = productManager.getProductById(productId); // Obtener el producto por su ID
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" }); // Si no se encuentra el producto, devolver un mensaje de error
  }
});
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});