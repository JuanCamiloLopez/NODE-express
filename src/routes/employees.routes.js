import { Router } from "express";
import {
  get_employee,
  create_employee,
  update_employee,
  delete_employee,
  get_employee_by_id
} from "../controllers/employees.controller.js";

const router = Router();
router.get("/employees/:id", get_employee_by_id);
router.get("/employees", get_employee);
router.post("/employees", create_employee);
router.put("/employees/:id", update_employee);
router.delete("/employees/:id", delete_employee);

export default router;
