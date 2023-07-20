const express = require('express');

const { createTask, updateTask, deleteTask, getAllTasks,  getTask, getOpenTasks } = require("../controllers/tasks.controller")
const { isAuth, isAuthManager, isAuthAdmin } = require('../../middlewares/auth.middleware');
const TaskRoutes = express.Router();

TaskRoutes.post("/createtask", [isAuthManager], createTask)
TaskRoutes.patch("/updatetask/:id", [isAuth], updateTask)
TaskRoutes.delete("/deletetask/:id", [isAuthManager], deleteTask)
TaskRoutes.get("/", [isAuthManager], getAllTasks)
TaskRoutes.get("/:id", [isAuthManager], getTask)
TaskRoutes.get("/opentasks/list", [isAuthManager], getOpenTasks)

module.exports = TaskRoutes