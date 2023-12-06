
import express from "express";
import http from "http";
import { Server } from "socket.io";
import exphbs from "express-handlebars";
import path from "path";
import { productRouter } from "./routes/products.routes.js";
import { ProductManagerFile } from "./managers/ProductManagerFile.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productManagerFile = new ProductManagerFile(
  path.resolve(__dirname, "../files/products.json")
);

const PORT = process.env.PORT || 8080;

app.engine(
  "handlebars",
  exphbs({
    extname: ".handlebars",
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "main",
  })
);
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

io.emit("updateData", { products: productManagerFile.getAllProducts() });

app.use("/api/products", productRouter);

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

app.get("/", (req, res) => {
  res.render("home", { products: productManagerFile.getAllProducts() });
});

server.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

export { app };
