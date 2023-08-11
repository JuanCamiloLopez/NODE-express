import express, { json } from "express";
import employeesRoutes from './routes/employees.routes.js';

const app = express();
app.use(json());
app.use("/api/v1", employeesRoutes);
app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});


