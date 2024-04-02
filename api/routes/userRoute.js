import { Router } from "express"

import checkObjectIdParamMiddleware from "../middlewares/checkObjectIdParamMiddleware.js"
import {
  createUsersController,
  deleteUsersController,
  getAllUsersController,
  getUsersByIdController,
  updateUsersController,
} from "../controllers/usersController.js"

const router = Router()

// GET /api/employees - Retrieve all employees with pagination support
router.get("/", getAllUsersController)

// GET /api/employees/:id - Retrieve a specific employee by ID
router.get("/:id", checkObjectIdParamMiddleware, getUsersByIdController)

// POST /api/employees - Create a new employee
router.post("/", createUsersController)

// PUT /api/employees/:id - Update an existing employee
router.put("/:id", checkObjectIdParamMiddleware, updateUsersController)

// DELETE /api/employees/:id - Delete an employee
router.delete("/:id", checkObjectIdParamMiddleware, deleteUsersController)

export default router
