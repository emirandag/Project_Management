const express = require('express');

const { createTask, updateTask, deleteTask, getAllTasks,  getTask, getOpenTasks, addUserTask } = require("../controllers/tasks.controller")
const { isAuth, isAuthManager, isAuthAdmin } = require('../../middlewares/auth.middleware');
const TaskRoutes = express.Router();

TaskRoutes.post("/createtask", [isAuthManager], createTask)
TaskRoutes.patch("/updatetask/:id", [isAuth], updateTask)
TaskRoutes.delete("/deletetask/:id", [isAuthManager], deleteTask)
TaskRoutes.get("/", [isAuth], getAllTasks)
TaskRoutes.get("/:id", [isAuth], getTask)
TaskRoutes.get("/opentasks/list", [isAuth], getOpenTasks)
TaskRoutes.patch('/addusertask/:id&email=:email', [isAuth], addUserTask);

module.exports = TaskRoutes