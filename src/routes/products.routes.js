
import { Router } from "express";
import { ProductManagerFile } from "../managers/ProductManagerFile.js";

const path = "products.Json";
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get('/', async (req, res) => {
    res.send({
        status: "success",
        msg: `Ruta GET Products`
    });
});

router.get('/:pid', async (req, res) => {
    res.send({
        status: "success",
        msg: `Ruta GET ID Products`
    });
});

router.post('/', async (req, res) => {
    // Lógica para crear un nuevo producto desde el body de la solicitud
    res.send({
        status: "success",
        msg: "Ruta POST Products"
    });
});

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const updatedFields = req.body;

    // Verificar si el producto con el ID dado existe antes de intentar actualizarlo
    const existingProduct = productManagerFile.getProductById(pid);
    if (!existingProduct) {
        return res.status(404).send({
            status: "error",
            msg: `Producto con ID ${pid} no encontrado. No se puede actualizar.`
        });
    }

    // Actualizar los campos del producto sin cambiar el ID
    const updatedProduct = { ...existingProduct, ...updatedFields };
    productManagerFile.updateProduct(pid, updatedProduct);

    res.send({
        status: "success",
        msg: `Ruta PUT de products con ID: ${pid}`
    });
});

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;

    // Verificar si el producto con el ID dado existe antes de intentar eliminarlo
    const existingProduct = productManagerFile.getProductById(pid);
    if (!existingProduct) {
        return res.status(404).send({
            status: "error",
            msg: `Producto con ID ${pid} no encontrado. No se puede eliminar.`
        });
    }

    // Eliminar el producto con el ID dado
    productManagerFile.deleteProduct(pid);

    res.send({
        status: "success",
        msg: `Ruta DELETE de products con ID: ${pid}`
    });
});

export { router as productRouter };
