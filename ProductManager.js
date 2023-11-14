class TicketManager {
  #aprecioBaseDeGanacia = 1.15;
  constructor() {
    this.eventos = [];
    this.products = [];
  }
  addProduct = (code, title, description, price, thumbnail, stock) => {
    if (!code || !title || !description || !price || !thumbnail || !stock) {
      return 'Todos los datos son requeridos';
    }
    const productCode = this.products.find((product) => product.code === code);
    if (productCode) {
      return `El producto ya existe con el código: ${code}`;
    }
    const product = {
      id: this.products.length + 1,
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
    };
    this.products.push(product);
    return this.products;
  };
  getEventos = () => this.eventos;
  
  getEvento = (idEvento) => this.eventos.find((evento) => evento.id == idEvento) || 'No encontrado';
  
  addParticipante = (idEvento, idParticipante) => {
    const evento = this.getEvento(idEvento);
    if (evento === 'No encontrado') {
      return 'El evento no existe';
    }
    const registro = evento.partipantes.find((idPersona) => idPersona == idParticipante);
    if (registro) {
      return `El participante ${idParticipante} ya compró entradas`;
    }
    evento.partipantes.push(idParticipante);
    return evento;
  };
  
  getProducts = () => this.products;
  
  getProductById = (productId) => this.products.find((product) => product.id === productId) || console.error('No encontrado');
}

const ticketManager = new TicketManager();
let producto = ticketManager.addProduct(
  '001',
  'Producto 1',
  'Descripción del Producto 1',
  100,
  'ruta/imagen1.jpg',
  10
);
producto = ticketManager.addProduct(
  '002',
  'Producto 2',
  'Descripción del Producto 2',
  200,
  'ruta/imagen2.jpg',
  5
);


console.log('----------------PRUEBAS-----------------');
console.log('----------------productos----------');
const productos = ticketManager.getProducts();
console.log(productos);
console.log(producto);

console.log('----------------productos-Id---------');

console.log(ticketManager.getProductById(2));
