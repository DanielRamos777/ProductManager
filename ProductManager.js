class ProductManagement {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }

    getProducts() {
      return this.products;
    }

    addProduct(name, price, description, image, code, stock) {

      if (!name || !price || !description || !image || !code || !stock) {
        console.error('Todos los campos son requeridos');
        return;
      }
  
      if (this.products.some(product => product.code === code)) {
        console.error('Ya existe un producto con este código');
        return;
      }
  
      const newProduct = {
        id: this.nextId++,
        name,
        price,
        description,
        image,
        code,
        stock
      };
  
      this.products.push(newProduct);
      console.log(`Producto ${name} agregado exitosamente`);
    }
  

  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.error('Not found cgl');
        return;
      }
      return product;
    }
  }
  

  const productManager = new ProductManagement();
  
  productManager.addProduct('Laptop', 999.99, 'Laptop de alto rendimiento', 'laptop.png', 'LP100', 50);
  productManager.addProduct('Smartphone', 599.99, 'Último modelo de smartphone', 'smartphone.png', 'SP200', 100);
  
  console.log(productManager.getProducts());
  
  console.log(productManager.getProductById(1));
  console.log(productManager.getProductById(2));
  console.log(productManager.getProductById(3));
  
  module.exports = ProductManagement;