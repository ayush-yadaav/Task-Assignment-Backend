import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js"

const router = express.Router();

router.use(authMiddleware);

router.route("/")
.post(createTask)
.get(getTasks);

router.route("/:id")
.put(updateTask)
.delete(authorize("admin"), deleteTask);

export default router;

