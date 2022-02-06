import express from "express";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/todos", (req, res) => {
  const data = {
    data: {
      todos: {
        "1": "hello",
        "2": "world",
      },
    },
  };
  res.json(data);
});

export default app;
