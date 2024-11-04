import { Router } from "express";
import { todos } from "../models/todos.mjs";

const router = Router();

router.get("/api/todos", (req, res) => {
  res.send(todos);
});

router.post("/api/todos", (req, res) => {
  const { body } = req;
  const newTodo = { id: todos[todos.length - 1].id + 1, ...body };
  todos.push(newTodo);
  return res.sendStatus(201);
});

router.put("/api/todos/:id", (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) res.sendStatus(400);
  const findUserIndex = todos.findIndex((todo) => todo.id === parsedId);
  if (findUserIndex === -1) res.sendStatus(404);
  todos[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

router.delete("/api/todos/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = todos.findIndex((todo) => todo.id === parsedId);
  if (findUserIndex === -1) res.sendStatus(404);
  todos.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
