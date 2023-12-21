// archivo src\app.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import exphbs from "express-handlebars";
import path from "path";
import { productRouter } from "./routes/products.routes.js";
import { ProductManagerFile } from "./managers/ProductManagerFile.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.routes.js"; // Importa el enrutador de usuarios
// En tu archivo src/app.js
import { router as registerRouter } from "./routes/register.routes.js";
// import { registerRouter } from "./routes/register.routes.js"; 
import multer from "multer";

const MONGO = "mongodb+srv://oscardanielramosvillalobos:oscardanielramosvillalobos@cluster0.beo29ig.mongodb.net/BaseDeDatos";
const connection = mongoose.connect(MONGO, {
  serverSelectionTimeoutMS: 5000, // Tiempo de espera para seleccionar un servidor (en milisegundos)
});
connection
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((error) => console.error("Error de conexión a MongoDB:", error));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productManagerFile = new ProductManagerFile(
  path.resolve(__dirname, "../files/products.json")
);

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "handlebars",
  exphbs({
    extname: ".handlebars",
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Cliente conectado al socket");

  socket.emit("updateData", { products: productManagerFile.getAllProducts() });

  socket.on("addProduct", (data) => {
    const { title, price, status, description, code, stock } = data;
    console.log("Datos recibidos en el servidor:", data);

    const numericPrice = parseFloat(price) || 0;
    const numericStock = parseInt(stock) || 0;

    const newProduct = {
      title,
      price: numericPrice,
      status: status === "true",
      description: description || "",
      code,
      stock: numericStock,
    };

    productManagerFile.addProduct(newProduct);

    io.emit("updateData", { products: productManagerFile.getAllProducts() });
  });

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "public/images");
  },
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configuración de Multer
const upload = multer({ storage: storage });











  socket.on("deleteProductById", (data) => {
    const { id } = data;

    const deleted = productManagerFile.deleteProduct(id);
    if (deleted) {
      io.emit("updateData", { products: productManagerFile.getAllProducts() });
    } else {
      socket.emit("deleteProductByIdError", {
        message: "Producto no encontrado.",
      });
    }
  });
});
const hbs = exphbs.create({
  extname: ".handlebars",
  layoutsDir: path.join(__dirname, "views/layouts"),
  defaultLayout: "main",
  // Agrega la siguiente opción:
  allowProtoMethods: true,
  // También puedes agregar allowProtoProperties si es necesario:
  allowProtoProperties: true,
});


io.emit("updateData", { products: productManagerFile.getAllProducts() });

app.use("/api/products", productRouter);
app.use("/usuarios", userRouter);
app.use("/registro", registerRouter);


app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

app.get("/", (req, res) => {
  res.render("home", { products: productManagerFile.getAllProducts() });
});
// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    status: "error",
    message: "Error interno del servidor",
  });
});

server.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

export { app };
