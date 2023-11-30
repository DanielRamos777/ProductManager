
import { Router } from "express";
import { ProductManagerFile } from "../managers/ProductManagerFile.js";

const path = "products.json"; 
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req, res) => {
    const limit = req.query.limit; 
    const allProducts = limit ? productManagerFile.getAllProducts().slice(0, limit) : productManagerFile.getAllProducts();

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
            msg: `Producto con ID ${productId} no encontrado.`
        });
    }

    res.send({
        status: "success",
        msg: `Ruta GET ID Products`,
        product: product
    });
});

router.post('/', async (req, res) => {

    const newProduct = {
        status: true, 
        ...req.body,
    };
    productManagerFile.addProduct(newProduct);

    res.send({
        status: "success",
        msg: "Ruta POST Products",
        newProduct: newProduct
    });
});

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const updatedFields = req.body;

    const existingProduct = productManagerFile.getProductById(pid);
    if (!existingProduct) {
        return res.status(404).send({
            status: "error",
            msg: `Producto con ID ${pid} no encontrado. No se puede actualizar.`
        });
    }

    const updatedProduct = { ...existingProduct, ...updatedFields };
    productManagerFile.updateProduct(pid, updatedProduct);

    res.send({
        status: "success",
        msg: `Ruta PUT de products con ID: ${pid}`,
        updatedProduct: updatedProduct
    });
});

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;

    const existingProduct = productManagerFile.getProductById(pid);
    if (!existingProduct) {
        return res.status(404).send({
            status: "error",
            msg: `Producto con ID ${pid} no encontrado. No se puede eliminar.`
        });
    }

    productManagerFile.deleteProduct(pid);

    res.send({
        status: "success",
        msg: `Ruta DELETE de products con ID: ${pid}`
    });
});

export { router as productRouter };
