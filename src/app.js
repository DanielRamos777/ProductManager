 
import express from "express";
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";
import { ProductManagerFile } from "./managers/ProductManagerFile.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; 


const PORT = 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const productManagerFile = new ProductManagerFile(path.resolve(__dirname, '../files/products.json'));


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
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

export { productManagerFile };