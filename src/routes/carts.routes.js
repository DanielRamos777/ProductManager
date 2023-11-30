// archivo carts.routes.js
import { Router } from "express";
import { CartManagerFile } from "../managers/cartManagerFile.js";
const path = "carts.Json";
const router = Router();
const cartManagerFile = new CartManagerFile(path);
router.get('/', async (req, res) => {
    res.send({
        status: "success",
        msg: `Ruta GET Cart`
    });
});
router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const cart = cartManagerFile.getCartById(cid);
    if (!cart) {
        return res.status(404).send({
            status: "error",
            msg: `Carrito con ID ${cid} no encontrado.`
        });
    }
    res.send({
        status: "success",
        msg: `Ruta GET ID Cart ${cid}`,
        cart: cart
    });
});
router.post('/', async (req, res) => {
    const newCart = cartManagerFile.createCart();
    res.send({
        status: "success",
        msg: "Ruta POST Cart",
        cart: newCart
    });
});
router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = cartManagerFile.getCartById(cid);
    if (!cart) {
        return res.status(404).send({
            status: "error",
            msg: `Carrito con ID ${cid} no encontrado. No se puede agregar el producto.`
        });
    }
    const product = cartManagerFile.getProductById(pid);
    if (!product) {
        return res.status(404).send({
            status: "error",
            msg: `Producto con ID ${pid} no encontrado. No se puede agregar al carrito.`
        });
    }
    cartManagerFile.addProductToCart(cart, product);
    res.send({
        status: "success",
        msg: `Ruta POST Cart - Agrego producto al carrito. PID: ${pid} CID: ${cid}`
    });
});
router.put('/:cid', async (req, res) => {
    const cid = req.params.cid;
    res.send({
        status: "success",
        msg: `Ruta PUT de Cart con ID: ${cid}`
    });
});
router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    res.send({
        status: "success",
        msg: `Ruta DELETE de Cart con ID: ${cid}`
    });
});
export { router as cartRouter };