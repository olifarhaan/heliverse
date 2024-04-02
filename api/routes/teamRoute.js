import { Router } from "express"


import { createTeamController, getTeamsController } from "../controllers/teamsController.js"

const router = Router()

// GET /api/employees - Retrieve all employees with pagination support
router.get("/", getTeamsController)

// POST /api/users - creates a team
router.post("/", createTeamController)


export default router
