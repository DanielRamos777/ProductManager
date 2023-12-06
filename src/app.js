// Archivo src\app.js
console.log(123)
import express from "express";
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";
import { ProductManagerFile } from "./managers/ProductManagerFile.js";
// import expressHandlebars from "express-handlebars";
import exphbs from "express-handlebars";

// import users from "./users.js";
import path from 'path';
import { Server } from "socket.io";
import { createServer } from "http";
console.log(1)
const productManager = new ProductManagerFile();
const PORT = 8080;
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const productManagerFile = new ProductManagerFile(path.resolve(__dirname, '../files/products.json'));
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(express.static(path.join(__dirname, "public")));

// ----------------------------------------------
// Configurar Handlebars como el motor de plantillas
app.engine(
  "handlebars",
  exphbs({
    extname: ".handlebars",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);
console.log(2)
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
});

httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

console.log(3)
// Rutas
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
console.log(4)
// Ruta para la vista "realTimeProducts.handlebars"
app.get('/realtimeproducts', (req, res) => {
  // Puedes pasar los productos a la vista directamente o como parte del estado inicial
  const data = {
    title: 'Productos en Tiempo Real',
    products: productManager.getAllProducts(),
  };

  res.render('realTimeProducts', data);
});

// app.listen(PORT, () => {
//   console.log(`Servidor funcionando en el puerto: ${PORT}`);
// });
console.log(5)
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

console.log("Hola1556")

export default app;