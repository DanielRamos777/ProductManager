
import express from 'express';
import { ProductManagerFile } from '../managers/ProductManagerFile.js';

const router = express.Router();
const productManagerFile = new ProductManagerFile();

router.get('/', async (req, res) => {
  try {
    const products = await productManagerFile.consultarProductos();
    res.render('home', { products });
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error.message);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

export { router as views };
