const fs = require("fs");

class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filename, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products);
    fs.writeFileSync(this.filename, data, "utf8");
  }

  addProduct(product) {
    const newProduct = {
      id: this.products.length + 1,
      ...product,
    };

    this.products.push(newProduct);
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
    const index = this.products.findIndex(
      (product) => product.id === productId
    );
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

const productManager = new ProductManager("products.json");

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


productManager.addProduct(product1);
productManager.addProduct(product2);
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
const isUpdated = productManager.updateProduct(2, updatedProduct);
console.log("¿Producto actualizado?", isUpdated);

const deletedProduct = productManager.deleteProduct(1);
console.log("¿Producto eliminado?", deletedProduct);

const remainingProducts = productManager.getAllProducts();
console.log(remainingProducts);