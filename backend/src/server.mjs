import express from "express";
import todosRouter from "./routes/todos.mjs";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3009;

app.use(cors());
app.use(express.json());
app.use(todosRouter);

app.get("/", (req, res) => {
  res.send("Base route");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
