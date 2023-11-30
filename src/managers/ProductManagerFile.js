
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export class ProductManagerFile {
  constructor(filename) {
    // Corrige la asignación del nombre de archivo
    this.filename = path.join(__dirname, '../files/products.json');
    console.log('../files/products.json', this.filename);
    this.loadProducts();
    this.idCounter = 1;
  }
  

  loadProducts() {
    try {
      if (fs.existsSync(this.filename)) {
        const data = fs.readFileSync(this.filename, 'utf8');
        this.products = JSON.parse(data); 
      } else {
        this.products = [];
      }
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filename, data, "utf8");
  }

  addProduct(product) {
    const newProduct = {
      id: this.idCounter,
      ...product,
    };
    this.products.push(newProduct);
    this.idCounter++;
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

const productManager = new ProductManagerFile(path.resolve(__dirname, '../files/products.json'));

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = this.incrementarId();
  }

  static idCounter = 1;

  incrementarId() {
    const newId = Product.idCounter;
    Product.idCounter++;
    return newId;
  }
}

productManager.products = [];
productManager.saveProducts();

const product1 = new Product("Producto 1", "Descripción del Producto 1", 100, ["ruta/imagen1.jpg", "ruta/imagen1_2.jpg"], "001", 10);
const product2 = new Product("Producto 2", "Descripción del Producto 2", 200, ["ruta/imagen2.jpg", "ruta/imagen2_2.jpg"], "002", 5);
const product3 = new Product("Producto 3", "Descripción del Producto 3", 150, ["ruta/imagen3.jpg", "ruta/imagen3_2.jpg"], "003", 8);
const product4 = new Product("Producto 4", "Descripción del Producto 4", 180, ["ruta/imagen4.jpg", "ruta/imagen4_2.jpg"], "004", 12);
const product5 = new Product("Producto 5", "Descripción del Producto 5", 100, ["ruta/imagen5.jpg", "ruta/imagen5_2.jpg"], "005", 10);
const product6 = new Product("Producto 6", "Descripción del Producto 6", 120, ["ruta/imagen6.jpg", "ruta/imagen6_2.jpg"], "006", 15);
const product7 = new Product("Producto 7", "Descripción del Producto 7", 90, ["ruta/imagen7.jpg", "ruta/imagen7_2.jpg"], "007", 7);
const product8 = new Product("Producto 8", "Descripción del Producto 8", 220, ["ruta/imagen8.jpg", "ruta/imagen8_2.jpg"], "008", 3);
const product9 = new Product("Producto 9", "Descripción del Producto 9", 80, ["ruta/imagen9.jpg", "ruta/imagen9_2.jpg"], "009", 20);
const product10 = new Product("Producto 10", "Descripción del Producto 10", 150, ["ruta/imagen10.jpg", "ruta/imagen10_2.jpg"], "010", 12);

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

console.log("------PRUEBAS------");
// const allProducts = productManager.getAllProducts();
// console.log(allProducts);

// const productById = productManager.getProductById(2);
// console.log(productById);

const updatedProduct = {
  code: "002",
  title: "Producto 2 Modificado",
  description: "Descripción del Producto 2 Modificado",
  price: 250,
  thumbnail: "ruta/imagen2_modificado.jpg",
  stock: 8,
};

const isUpdated = productManager.updateProduct( 0, updatedProduct);
// console.log("¿Producto actualizado?", isUpdated);

const deletedProduct = productManager.deleteProduct(0);
// console.log("¿Producto eliminado?", deletedProduct);

const remainingProducts = productManager.getAllProducts();
// console.log(remainingProducts);


