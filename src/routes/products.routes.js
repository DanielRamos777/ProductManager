// archivo products.routes.js
import { Router } from "express";
import { ProductManagerFile } from "../managers/ProductManagerFile.js";
const path = "products.json";
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req, res) => {
    const allProducts = productManagerFile.getAllProducts();
    res.send({
        status: "success",
        msg: "Ruta GET Products",
        products: allProducts
    });
});

router.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManagerFile.getProductById(productId);
    if (!product) {
        return res.status(404).send({
            status: "error",
            msg:  `Producto con ID ${productId} no encontrado.` 
        });
    }
    res.send({
        status: "success",
        msg:  `Ruta GET ID Products` ,
        product: product
    });
});

router.post('/', async (req, res) => {
    const newProduct = req.body;
    productManagerFile.addProduct(newProduct);
    res.send({
        status: "success",
        msg: "Ruta POST Products",
        newProduct: newProduct
    });
});

export { router as productRouter };