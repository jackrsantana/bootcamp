const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Jackson", "email": "jack.rsantana@gmail.com" }

const users = ["Jackson", "Thiago", "Gustavo"];

// server.get("/teste", (req, res) => {
//   // return res.send('Hello World');
//   // return res.json({ message: "Hello World" });

//   const nome = req.query.nome;
//   return res.json({ message: `Hello ${nome}` });
// });

// server.get("/users/:id", (req, res) => {
//   // const id = req.params.id;
//   const { id } = req.params;
//   return res.json({ message: `Buscando o Usuário ${id}` });
// });

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  // const { index } = req.params;
  // if (!users[index]) {
  //   return res.status(400).json({ error: "User does not exists" });
  // }
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }
  req.user = user;

  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  // const { index } = req.params;

  // return res.json(users[index]);
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

server.listen(3000);
