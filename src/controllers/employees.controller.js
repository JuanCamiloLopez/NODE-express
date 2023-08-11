import { json } from "express";
import { pool } from "../db.js";

export const get_employee = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employee");
    const rows = result.rows;
    res.status(200).json(rows);
  } catch (error) {
    console.log("error la traer los empleados:", error);
    res.status(500).json({ message: "error en la consulta" });
  }
};

export const create_employee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const result = await pool.query(
      "INSERT INTO employee (name, salary) VALUES ($1, $2) RETURNING id",
      [name, salary]
    );
    const insertedId = result.rows[0].id;
    res
      .status(201)
      .json({ id: insertedId, message: "Employee created successfully" });
  } catch (error) {
    console.error("Error creating employee:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating employee" });
  }
};

export const update_employee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body; 
    const result = await pool.query(
      "UPDATE employee SET name = $1, salary = $2 WHERE id = $3",
      [name, salary, id]
    );
    const rowCount = result.rowCount;
    if (rowCount > 0) {
      res.status(200).json({ message: "Actualización exitosa" });
    } else {
      res.status(404).json({ message: "Ninguna fila actualizada" });
    }
  } catch (error) {
    console.error("Error en la actualización:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const delete_employee = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM employee WHERE id = $1", [id]);
    const row = result.rows;
    res.send(row);
  } catch (error) {
    console.log("error la traer el empleado:", error);
    res.status(500).json({ message: "error interno en el sevidor" });
  }
};

export const get_employee_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(`SELECT * FROM employee WHERE id = ${id}`);
    const empleado = result.rows;
    empleado.length > 0
      ? res.status(200).json(empleado[0])
      : res.status(404).json({ message: "Empleado no encotrado" });
  } catch (error) {
    console.log("error la traer el empleado:", error);
    res.status(500).json({ message: "error interno en el sevidor" });
  }
};
