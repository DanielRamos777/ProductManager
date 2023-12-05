// Archivo app.js
import express from "express";
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";
import { ProductManagerFile } from "./managers/ProductManagerFile.js";
import handlebars from "express-handlebars";
import users from "./users.js";
import path from 'path';

const productManager = new ProductManagerFile();
const PORT = 8080;
const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const productManagerFile = new ProductManagerFile(path.resolve(__dirname, '../files/products.json'));

app.engine("handlebars", handlebars.create({
  extname: ".handlebars",
  layoutsDir: path.join(__dirname, "views/layouts"),
}).engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const randomUser = users[Math.floor(Math.random() * users.length - 1)];
  res.render("index", {
    nombre: randomUser.nombre,
    apellido: randomUser.apellido,
    edad: randomUser.edad,
  });
});



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

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
