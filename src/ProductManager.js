// Archico ProductManager.js
import fs from "fs";

export default class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.loadProducts();
    this.idCounter = 1; // Inicializar el contador de IDs en 1
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filename, "utf8");
      this.products = data
        .split("\n")
        .filter((line) => line.trim() !== "") // Filtrar líneas vacías
        .map((line) => JSON.parse(line));
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = this.products
      .map((product) => JSON.stringify(product))
      .join("\n");
    fs.writeFileSync(this.filename, data, "utf8");
  }

  addProduct(product) {
    const newProduct = {
      id: this.idCounter,
      ...product,
    };
    this.products.push(newProduct);
    this.idCounter++; // Incrementar el contador de IDs
    this.saveProducts();
  }


  getProductById(productId) {
    return this.products.find((product) => product.id === productId);
  }

  updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id: productId };
      this.saveProducts();
      return true;
    }
    return false;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }

  getAllProducts() {
    return this.products;
  }
}

const productManager = new ProductManager("products.txt");

const product1 = {
  title: "Producto 1",
  description: "Descripción del Producto 1",
  price: 100,
  thumbnail: "ruta/imagen1.jpg",
  code: "001",
  stock: 10,
};

const product2 = {
  title: "Producto 2",
  description: "Descripción del Producto 2",
  price: 200,
  thumbnail: "ruta/imagen2.jpg",
  code: "002",
  stock: 5,
};
const product3 = {
  title: "Producto 3",
  description: "Descripción del Producto 3",
  price: 150,
  thumbnail: "ruta/imagen3.jpg",
  code: "003",
  stock: 8,
};
const product4 = {
  title: "Producto 4",
  description: "Descripción del Producto 4",
  price: 180,
  thumbnail: "ruta/imagen4.jpg",
  code: "004",
  stock: 12,
};
const product5 = {
  title: "Producto 5",
  description: "Descripción del Producto 5",
  price: 100,
  thumbnail: "ruta/imagen5.jpg",
  code: "005",
  stock: 10,
};
const product6 = {
  title: "Producto 6",
  description: "Descripción del Producto 6",
  price: 200,
  thumbnail: "ruta/imagen6.jpg",
  code: "006",
  stock: 5,
};
const product7 = {
  title: "Producto 3",
  description: "Descripción del Producto 7",
  price: 150,
  thumbnail: "ruta/imagen7.jpg",
  code: "007",
  stock: 8,
};
const product8 = {
  title: "Producto 8",
  description: "Descripción del Producto 8",
  price: 180,
  thumbnail: "ruta/imagen8.jpg",
  code: "008",
  stock: 12,
};const product9 = {
  title: "Producto 9",
  description: "Descripción del Producto 9",
  price: 150,
  thumbnail: "ruta/imagen9.jpg",
  code: "009",
  stock: 8,
};
const product10 = {
  title: "Producto 10",
  description: "Descripción del Producto 10",
  price: 180,
  thumbnail: "ruta/imagen10.jpg",
  code: "010",
  stock: 12,
};


// Reiniciar el archivo "products.txt"
productManager.products = [];
productManager.saveProducts();

// Agregar los productos
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
productManager.addProduct(product6);
productManager.addProduct(product7);
productManager.addProduct(product8);
productManager.addProduct(product9);
productManager.addProduct(product10);


const allProducts = productManager.getAllProducts();
console.log(allProducts);
const productById = productManager.getProductById(2);
console.log(productById);
const updatedProduct = {
  code: "002",
  title: "Producto 2 Modificado",
  description: "Descripción del Producto 2 Modificado",
  price: 250,
  thumbnail: "ruta/imagen2_modificado.jpg",
  stock: 8,
};

console.log("------PRUEBAS------");
const isUpdated = productManager.updateProduct(0, updatedProduct);
console.log("¿Producto actualizado?", isUpdated);


const deletedProduct = productManager.deleteProduct(0);
console.log("¿Producto eliminado?", deletedProduct);

const remainingProducts = productManager.getAllProducts();
console.log(remainingProducts);
