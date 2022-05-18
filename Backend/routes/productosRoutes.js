import express from "express";
import {
  getProductos,
  agregarProducto,
  putProducto,
  deleteProducto,
  getProducto,
} from "../controllers/productoscontroller.js";

const router = express.Router();

router.get("/", getProductos);
router.post("/crearProducto", agregarProducto);
router.put("/editarProducto/:id", putProducto);
router.delete("/borrarProducto/:id", deleteProducto);
router.get("/getProducto/:id", getProducto);
//router.patch("/modificarProducto/:ID", modificarProducto);
export default router;
//PG3w3wuxqEVJjWDE6219
