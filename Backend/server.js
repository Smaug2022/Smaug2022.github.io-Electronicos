import express from "express";
import bodyParser from "body-parser";
import productosRoutes from "./routes/productosRoutes.js";
import cors from "cors";
const app = express();
app.use(bodyParser.json());

const PORT = 8080;
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use("/productos", productosRoutes);

app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`)
);
