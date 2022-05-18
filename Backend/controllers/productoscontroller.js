import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

export const getProductos = async (req, res, next) => {
  console.log("entro");
  const productosSnapshot = await getDocs(collection(db, "productos"));
  let productos = productosSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  res.status(201).json(productos);
  //const productosList = usersSnapshot.docs.map((doc) => doc.data());
};

export const agregarProducto = async (req, res, next) => {
  const producto = req.body;
  console.log(producto);

  try {
    const docRef = await addDoc(collection(db, "productos"), {
      descripcion: producto.descripcion,
      precio: producto.precio,
      img: producto.img,
      cantidad: 1,
    });
    console.log("Document written with ID: ", docRef.id);
    res
      .status(201)
      .json(
        `Producto con descripción ${producto.descripcion} añadido a la base de datos`
      );
  } catch (err) {
    res.status(500).json(err);
    console.error("Error adding document: ", err);
  }
};

export const putProducto = async (req, res, next) => {
  const datosProducto = req.body;
  const { id } = req.params;
  const prodRef = doc(db, "productos", id);
  try {
    await updateDoc(prodRef, datosProducto);
    console.log("Document updated with ID: ", prodRef.id);
    res.status(201).json(`Producto actualizado correctamente`);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProducto = async (req, res, next) => {
  const { id } = req.params;
  const prodRef = doc(db, "productos", id);
  try {
    await deleteDoc(prodRef);
    res.status(201).json(`Producto eliminado correctamente`);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProducto = async (req, res, next) => {
  const { id } = req.params;
  const prodRef = doc(db, "productos", id);
  try {
    const producto = await getDoc(prodRef);
    if (producto.exists()) {
      res.status(201).json(producto.data());
    } else {
      res.status(500).json("No existe el producto");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
